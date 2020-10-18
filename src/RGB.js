function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}
function HSVtoRGB(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}
/* accepts parameters
 * r  Object = {r:x, g:y, b:z}
 * OR 
 * r, g, b
*/
function RGBtoHSV(r, g, b) {
    if (arguments.length === 1) {
        g = r.g, b = r.b, r = r.r;
    }
    var max = Math.max(r, g, b), min = Math.min(r, g, b),
        d = max - min,
        h,
        s = (max === 0 ? 0 : d / max),
        v = max / 255;

    switch (max) {
        case min: h = 0; break;
        case r: h = (g - b) + d * (g < b ? 6: 0); h /= 6 * d; break;
        case g: h = (b - r) + d * 2; h /= 6 * d; break;
        case b: h = (r - g) + d * 4; h /= 6 * d; break;
    }

    return {
        h: h,
        s: s,
        v: v
    };
}

export class RGB{
    constructor(r=null,g=null,b=null)
    {
		if(r[0] === "#" && !g && !b)
		{
			const obj = hexToRgb(r);
			this.red = obj.r;
			this.blue = obj.b;
            this.green = obj.g;
            return;
		}
		if(r===null || g === null || b===null)
			throw new Error("Incorrect args to RGB constructor: "+r);
      this.red = r;
      this.green = g;
      this.blue = b;
    }

    get red() { return this._red; }
    set red(v) { this._mode="rgb";return this._red = Number(v);}
    get green() { return this._green; }
    set green(v) { this._mode="rgb";return this._green = Number(v);}
    get blue() { return this._blue; }
    set blue(v) { this._mode="rgb";return this._blue = Number(v);}
    get average()
    {
        const avg = (this.red+this.green+this.blue)/3;
        return avg;
    }
    get normalized()
    {
      const avg = this.average;
      if (avg === 0) {
        return new RGB(0, 0, 0);
      }
      return new RGB(this.red / avg, this.green / avg, this.blue / avg);
    }

    _min_primary = ()=>
	{
		return Math.min(this.red, Math.min(this.green,this.blue)); 
	}
    _max_primary()
	{
		return Math.max(this.red, Math.max(this.green,this.blue)); 
	}

	_hsv()
	{
        if(this._mode === "rgb")
        {
            const res = RGBtoHSV(this.red, this.green, this.blue);
            return [res.h*255, res.s*255, res.v*255];
        }
        else
        {
            return [this._hue, this._saturation, this._brightness];
        }
    }
    
    _set_hsv(h, s, v)
    {
        h = Number(h);
        s = Number(s);
        v = Number(v);
        const res = HSVtoRGB(h / 255, s / 255, v / 255)
        this._red = res.r;
        this._green = res.g;
        this._blue = res.b;
        this._mode = "hsv"

        this._hue = h;
        this._saturation = s;
        this._brightness = v;
    }

	get hue()
	{
		return this._hsv()[0];
    }
    set hue(h)
    {
        this._set_hsv(h, this.saturation, this.brightness)
    }
	get saturation()
	{
		return this._hsv()[1];
    }
    set saturation(s)
    {

        this._set_hsv(this.hue, s, this.brightness)
    }
	get brightness()
	{
		return this._hsv()[2];
    }
    set brightness(v)
    {

        this._set_hsv(this.hue, this.saturation, v)
    }


    asHex()
    {
        function format(color) {
            let hex = (+color).toString(16);
            if (hex.length < 2)
                hex = "0" + hex;
            return hex;
        }
        return `#${format(this.red)}${format(this.green)}${format(this.blue)}`
    }
	
}
