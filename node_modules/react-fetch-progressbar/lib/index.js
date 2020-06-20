"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
// Keeps track of how many requests are currently active.
exports.activeRequests = 0;
class ProgressBar extends react_1.Component {
    constructor() {
        super(...arguments);
        this.state = {
            mode: 'hibernate',
        };
    }
    // Set the reference to progressBar
    componentDidMount() {
        exports.progressBar = this;
    }
    // Only render if the mode changes
    shouldComponentUpdate(nextProps, nextState) {
        return nextState.mode !== this.state.mode;
    }
    /**
     * The ProgressBar continuously checks the status of how many
     * requests are currently active, and will accordingly move
     * to another state.
     *
     * @memberof ProgressBar
     */
    tick() {
        const mode = this.state.mode;
        if (mode === 'complete') {
            //console.log('complete: moving to hibernate after 1 second to allow the close animation to complete');
            setTimeout(() => {
                this.setState({ mode: 'hibernate' });
            }, 1000);
        }
        else if (mode === 'active') {
            if (exports.activeRequests === 0) {
                //console.log('active: there are no more pending request move to complete if there are still no pending requests after 200 milliseconds');
                setTimeout(() => {
                    if (exports.activeRequests === 0) {
                        //console.log('active: even after 200 milliseconds there are no more pending request, moving to complete');
                        this.moveToMode('complete');
                    }
                    else {
                        //console.log('active: after 200 milliseconds another request was pending instead of going to complete will stay active.');
                        this.tick();
                    }
                }, 200);
            }
            else {
                //console.log('active: there are still pending requests staying active');
                this.tickWithDelay();
            }
        }
        else {
            // mode === 'init'
            if (exports.activeRequests > 0) {
                //console.log('init: there are pending request move to active if there are still pending requests after 100 milliseconds');
                setTimeout(() => {
                    if (exports.activeRequests > 0) {
                        //console.log('init: even after 100 milliseconds there are pending request, moving to active to trigger animation');
                        this.moveToMode('active');
                    }
                    else {
                        //console.log('init: after 100 milliseconds there were no pending request, the requests was so fast that showing an animation is unnecessary, move to hibernate');
                        this.setState({ mode: 'hibernate' });
                    }
                }, 100);
            }
            else {
                //console.log('init: no pending requests move to hibernate');
                this.setState({ mode: 'hibernate' });
            }
        }
    }
    moveToInit() {
        if (this.state.mode === 'hibernate') {
            this.moveToMode('init');
        }
    }
    moveToMode(mode) {
        this.setState({ mode }, () => {
            this.tick();
        });
    }
    tickWithDelay() {
        setTimeout(() => {
            this.tick();
        }, 50);
    }
    render() {
        const mode = this.state.mode;
        if (mode === 'hibernate') {
            return null;
        }
        const width = mode === 'complete' ? 100 : mode === 'init' ? 0 : 80;
        const animationSpeed = mode === 'complete' ? 0.8 : 30;
        const transition = mode === 'init' ? '' : `width ${animationSpeed}s ease-in`;
        const style = Object.assign({ position: 'absolute', top: '0', zIndex: 9000, backgroundColor: '#f0ad4e', height: '4px', transition, width: `${width}%` }, this.props.style);
        return react_1.default.createElement("div", { className: "react-fetch-progress-bar", style: style });
    }
}
exports.ProgressBar = ProgressBar;
// We store the fetch here as provided by the user.
let originalFetch;
function setOriginalFetch(nextOriginalFetch) {
    originalFetch = nextOriginalFetch;
}
exports.setOriginalFetch = setOriginalFetch;
/**
 * Wrapper around fetch: https://developer.mozilla.org/en/docs/Web/API/Fetch_API
 *
 * It is used to monitor the number of requests which are currently
 * active. Each time a requests is made it increases the number of
 * requests, each time a request is finished, the number is decreased.
 *
 * @export
 * @param {string} url The url you want to send a request to.
 * @param {RequestOptions} [options] The options you want to pass for that request
 * @returns {Promise<Response>} A Promise which returns a Response
 */
function progressBarFetch(url, options) {
    return __awaiter(this, void 0, void 0, function* () {
        exports.activeRequests += 1;
        if (exports.progressBar) {
            exports.progressBar.moveToInit();
        }
        try {
            const response = yield originalFetch(url, options);
            exports.activeRequests -= 1;
            return response;
        }
        catch (error) {
            exports.activeRequests -= 1;
            return Promise.reject(error);
        }
    });
}
exports.progressBarFetch = progressBarFetch;
/**
 * Sets the number of activeRequests manually.
 *
 * This method exists for testing purposes, so you should not
 * use it.
 *
 * @export
 * @param {number} nextActiveRequest
 */
function setActiveRequests(nextActiveRequest) {
    exports.activeRequests = nextActiveRequest;
}
exports.setActiveRequests = setActiveRequests;
