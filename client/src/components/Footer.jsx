import React from "react"
import './Footer.css'
const Footer = () => {
return (
    <div className="footer">
    <p>Developed By:</p>
    <div className="images">
        <div className="developer">
          <a href="https://www.github.com/agibes">
          <img src="https://www.avatarsinpixels.com/chibi/eyJIYWlyTG93ZXIiOiI1IiwiU2hvZXMiOiIzIiwiUGFudHMiOiIxNSIsIlRvcCI6IjE5IiwiRXllYnJvd3MiOiIxIiwiRXllcyI6IjMiLCJNb3V0aCI6IjUiLCJIYWlyVG9wIjoiOCIsImhhaXJUb25lIjoiZWZlYmE5IiwidG9wVG9uZSI6IjE0OTdkNiIsInNob2VzVG9uZSI6ImI4YjhiOCJ9/1/show.png"></img>
          </a>
          <p>Anna</p>
        </div>
        <div className="developer">
          <a href="https://github.com/BDay1">
          <img src="#"></img>
          </a>
          <p>Brooke</p>
        </div>        <div className="developer">
          <a href="https://github.com/nedyaHV">
          <img src="#"></img>
          </a>
          <p>Dustin</p>
        </div>        <div className="developer">
          <a href="https://github.com/duckypile">
          <img src="#"></img>
          </a>
          <p>Hayden</p>
        </div>
    </div>
    </div>
)
}

export default Footer;