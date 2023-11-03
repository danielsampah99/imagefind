// or 'promise-polyfill' or another Promise polyfill
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
// Access key from unsplash.com to access their api.
var accessKey = "R8VF5DtWaupfudeO9XsvbtXuc-ENVeDOt7jxPqY3OBI";
// Representing html elements in javascript.
var formElement = document.querySelector("form");
var inputElement = document.getElementById("searchInput");
var searchResults = document.querySelector(".search--results");
var showMore = document.getElementById("show-more--button");
var inputData = "";
var page = 1;
// Function to control image search.
function searchImages() {
    return __awaiter(this, void 0, void 0, function () {
        var url, response, data, results;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    inputData = inputElement.value;
                    url = "https://api.unsplash.com/search/photos?page=".concat(page, "&query=").concat(inputData, "&client_id=").concat(accessKey);
                    return [4 /*yield*/, fetch(url)];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("Failed to fetch data: ".concat(response.status));
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    results = data.result;
                    console.log(results);
                    if (page === 1) {
                        searchResults.innerHTML = "";
                    }
                    // console.log(results);
                    results.forEach(function (result) {
                        var imageWrapper = document.createElement("div");
                        imageWrapper.classList.add("search-result");
                        var image = document.createElement("img");
                        image.setAttribute("src", result.urls.full);
                        if (result.alt_description) {
                            image.alt = result.alt_description;
                        }
                        else {
                            image.alt = "Image Description Is Not Available At This Time.";
                        }
                        var imageLink = document.createElement("a");
                        imageLink.href = result.links.html;
                        imageLink.target = "_blank";
                        imageLink.textContent = result.alt_description;
                        imageWrapper.appendChild(image);
                        imageWrapper.appendChild(imageLink);
                        searchResults.appendChild(imageWrapper);
                    });
                    // Increment the page number
                    page++;
                    // Show the "Show More" button if on page 2 or higher
                    if (page > 1) {
                        showMore.style.display = "block";
                    }
                    return [2 /*return*/];
            }
        });
    });
}
// Create an event listener for the form element.
formElement.addEventListener("submit", function (event) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                event.preventDefault();
                page = 1;
                return [4 /*yield*/, searchImages()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
// Create an event listener for the show more button.
showMore.addEventListener("click", function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, searchImages()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
