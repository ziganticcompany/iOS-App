import React, { Component } from 'react';
export declare let activeRequests: number;
export declare let progressBar: ProgressBar;
declare type Mode = 'hibernate' | 'init' | 'active' | 'complete' | 'inactive';
interface Props {
    style?: Record<string, any>;
}
interface State {
    mode: Mode;
}
export declare class ProgressBar extends Component<Props, State> {
    state: Readonly<State>;
    componentDidMount(): void;
    shouldComponentUpdate(nextProps: Props, nextState: State): boolean;
    /**
     * The ProgressBar continuously checks the status of how many
     * requests are currently active, and will accordingly move
     * to another state.
     *
     * @memberof ProgressBar
     */
    tick(): void;
    moveToInit(): void;
    moveToMode(mode: Mode): void;
    tickWithDelay(): void;
    render(): React.ReactNode;
}
declare type FetchSignature = (url: string, options?: object) => Promise<Response>;
export declare function setOriginalFetch(nextOriginalFetch: FetchSignature): void;
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
export declare function progressBarFetch(url: string, options?: object): Promise<Response>;
/**
 * Sets the number of activeRequests manually.
 *
 * This method exists for testing purposes, so you should not
 * use it.
 *
 * @export
 * @param {number} nextActiveRequest
 */
export declare function setActiveRequests(nextActiveRequest: number): void;
export {};
