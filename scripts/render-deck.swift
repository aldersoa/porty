// Renders each page of a PDF to a JPEG for the site's deck pager.
//
// Usage:
//   swiftc -O scripts/render-deck.swift -o /tmp/render-deck
//   /tmp/render-deck public/media/<slug>/final.pdf public/media/<slug>/deck [widthPx] [quality]
//
// Defaults: width 1600 px, JPEG quality 0.8. Output: <outdir>/01.jpg, 02.jpg, …
// Rerun whenever a project's final.pdf changes, then update `deck.pages` in
// content/projects.json if the page count changed.

import Foundation
import CoreGraphics
import ImageIO
import UniformTypeIdentifiers

let args = CommandLine.arguments
guard args.count >= 3, let doc = CGPDFDocument(URL(fileURLWithPath: args[1]) as CFURL) else {
    print("usage: render-deck <in.pdf> <outdir> [widthPx] [quality]"); exit(1)
}
let outDir = args[2]
let targetW = CGFloat(args.count > 3 ? Double(args[3]) ?? 1600 : 1600)
let quality = args.count > 4 ? Double(args[4]) ?? 0.8 : 0.8

try? FileManager.default.createDirectory(atPath: outDir, withIntermediateDirectories: true)

for i in 1...doc.numberOfPages {
    guard let page = doc.page(at: i) else { continue }
    let box = page.getBoxRect(.mediaBox)
    let scale = targetW / box.width
    let w = Int(box.width * scale), h = Int(box.height * scale)

    let cs = CGColorSpaceCreateDeviceRGB()
    guard let bmp = CGContext(data: nil, width: w, height: h, bitsPerComponent: 8,
                              bytesPerRow: 0, space: cs,
                              bitmapInfo: CGImageAlphaInfo.noneSkipLast.rawValue) else { continue }
    bmp.setFillColor(CGColor(red: 1, green: 1, blue: 1, alpha: 1))
    bmp.fill(CGRect(x: 0, y: 0, width: w, height: h))
    bmp.scaleBy(x: scale, y: scale)
    bmp.translateBy(x: -box.origin.x, y: -box.origin.y)
    bmp.drawPDFPage(page)
    guard let image = bmp.makeImage() else { continue }

    let name = String(format: "%02d.jpg", i)
    let url = URL(fileURLWithPath: outDir).appendingPathComponent(name) as CFURL
    guard let dest = CGImageDestinationCreateWithURL(url, UTType.jpeg.identifier as CFString, 1, nil) else { continue }
    CGImageDestinationAddImage(dest, image, [kCGImageDestinationLossyCompressionQuality: quality] as CFDictionary)
    CGImageDestinationFinalize(dest)
}
print("rendered \(doc.numberOfPages) pages to \(outDir)")
