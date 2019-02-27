
const judgeType = (val) => {
    const class2type = {};

    // 生成class2type映射
    'Boolean Number String Function Array Date RegExp Object Error'.split(' ').forEach((item) => {
        class2type[`[object ${item}']`] = item.toLowerCase();
    });

    function type(obj) {
        if (obj == null) {
            return `${obj}`;
        }
        return typeof obj === 'object' || typeof obj === 'function' ?
            class2type[Object.prototype.toString.call(obj)] || 'object' :
            typeof obj;
    }

    return type(val);
};

class GradientCreator {
    constructor(colors, vals = [0, 10]) {
        this.vals = vals;
        this.rgbs = [];
        colors.forEach((color) => {
            this.rgbs.push(this.colorRgb(color));
        });
        const stepCounts = colors.length - 1;
        const stepVal = (vals[1] - vals[0]) / stepCounts;
        this.stepVal = stepVal;
        this.stepVals = [];
        this.stepRs = [];
        this.stepGs = [];
        this.stepBs = [];
        for (let i = 0; i < stepCounts; i++) {
            const sRGB = this.rgbs[i];
            const eRGB = this.rgbs[i + 1];
            this.stepVals.push(vals[0] + stepVal * i);
            this.stepRs.push((eRGB[0] - sRGB[0]) / stepVal);
            this.stepGs.push((eRGB[1] - sRGB[1]) / stepVal);
            this.stepBs.push((eRGB[2] - sRGB[2]) / stepVal);
        }
    }

    getColor = (val) => {
        val = val < this.vals[0] ? this.vals[0] : val > this.vals[1] ? this.vals[1] : val;
        let index = this.stepVals.findIndex(num => num > val);
        index = ~index ? index - 1 : this.stepVals.length - 1;
        const realVal = val - this.stepVal * index;
        return this.colorHex(
            `rgb(${parseInt(this.stepRs[index] * realVal + this.rgbs[index][0], 10)},
                ${parseInt(this.stepGs[index] * realVal + this.rgbs[index][1], 10)},
                ${parseInt(this.stepBs[index] * realVal + this.rgbs[index][2], 10)})`
        );
    };

    colorRgb = (sColor) => {
        const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
        sColor = sColor.toLowerCase();
        if (sColor && reg.test(sColor)) {
            if (sColor.length === 4) {
                let sColorNew = '#';
                for (let i = 1; i < 4; i++) {
                    sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
                }
                sColor = sColorNew;
            }
            const sColorChange = [];
            for (let i = 1; i < 7; i += 2) {
                sColorChange.push(parseInt(`0x${sColor.slice(i, i + 2)}`, 16));
            }
            return sColorChange;
        } else {
            return sColor;
        }
    };

    colorHex = (rgb) => {
        const _this = rgb;
        const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
        if (/^(rgb|RGB)/.test(_this)) {
            const aColor = _this.replace(/(?:(|)|rgb|RGB)*/g, '').split(',');
            let strHex = '#';
            for (let i = 0; i < aColor.length; i++) {
                let hex = Number(aColor[i]).toString(16);
                hex = hex < 10 ? `0${hex}` : hex;
                if (hex === '0') {
                    hex += hex;
                }
                strHex += hex;
            }
            if (strHex.length !== 7) {
                strHex = _this;
            }
            return strHex;
        } else if (reg.test(_this)) {
            const aNum = _this.replace(/#/, '').split('');
            if (aNum.length === 6) {
                return _this;
            } else if (aNum.length === 3) {
                let numHex = '#';
                for (let i = 0; i < aNum.length; i += 1) {
                    numHex += aNum[i] + aNum[i];
                }
                return numHex;
            }
        } else {
            return _this;
        }
    };
}

const toPage = (history, path) => {
    history.push({ pathname: path });
};

export { judgeType, toPage, GradientCreator };
