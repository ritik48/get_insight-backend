"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const analyzeData_1 = require("./genai/analyzeData");
const text = `This has been quite a ride, a lot of you were with me from the start, many joined in between and I thank each and everyone of you for your support and motivation

Only a few knows why I started this in the first place, I was feeling a bit stagnant in my life, was not finding happiness in a lot of things and felt am just watching each day glide by me

I had been feeling like this for a while infact but never really tried to root cause it.

On a random evening while scrolling through twitter I saw many of you making cool stuff or upskilling in one form or another, I realized if I don't get back to learning I will become like those employees who don't have knowledge outside of what they learn at work. 

Frankly that's a fine lifestyle, people have various ways of spending their free time but for me I had to pick up something that makes me push my limits and learn, and that's how I just started solving DSA again and picked up system design properly`;
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, analyzeData_1.analyzeData)(text);
    });
})();
