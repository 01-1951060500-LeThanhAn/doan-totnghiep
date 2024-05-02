"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatPrice = void 0;
const formatPrice = (data) => {
    const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(data);
    return formatted;
};
exports.formatPrice = formatPrice;
