const withSass = require("@zeit/next-sass")
const withTypescript = require("@zeit/next-typescript")
const withImages = require("next-images")
const withFonts = require("next-fonts")

module.exports = withTypescript(withSass(withImages(withFonts())))
