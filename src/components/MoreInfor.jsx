import React from 'react';

const MoreInfor = () => {
    return (
        <section className="more mx-5 py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="more-item rounded bg-blue-50 p-6 text-center shadow-md hover:shadow-lg transition-shadow">
                    <svg height="96" viewBox="0 0 64 64" width="96" xmlns="http://www.w3.org/2000/svg">
                        <linearGradient id="a" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="32" x2="32" y1="16.501" y2="23.293">
                            <stop offset="0" stopColor="#6dc7ff" />
                            <stop offset="1" stopColor="#e6abff" />
                        </linearGradient>
                        <linearGradient id="b" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="32" x2="32" y1="10.001" y2="55.262">
                            <stop offset="0" stopColor="#1a6dff" />
                            <stop offset="1" stopColor="#c822ff" />
                        </linearGradient>
                        <path d="m23 20.002 9-3 9 3-9 3z" fill="url(#a)" />
                        <path d="m56.635 21.134-3.378-1.133 3.378-1.132a1.978 1.978 0 0 0 1.365-1.902c0-.88-.538-1.628-1.37-1.907l-14.619-4.902a3.012 3.012 0 0 0 -1.909 0l-8.102 2.716-8.101-2.717a2.974 2.974 0 0 0 -1.901-.002l-7.458 2.501c-3.608 1.21-7.08 2.373-7.172 2.403a1.988 1.988 0 0 0 -1.368 1.91 1.978 1.978 0 0 0 1.367 1.9l3.376 1.132-3.372 1.131a1.98 1.98 0 0 0 -1.369 1.906 1.98 1.98 0 0 0 1.369 1.905l5.629 1.888v19.512c0 1.245.833 2.342 2.072 2.729l14.724 4.595c.711.221 1.457.332 2.204.332s1.493-.111 2.204-.332l14.725-4.596c1.238-.386 2.071-1.483 2.071-2.728v-19.512l5.629-1.887a1.985 1.985 0 0 0 1.371-1.908c0-.876-.536-1.624-1.365-1.902zm-15.897-9.08c.205-.068.43-.068.635 0l14.626 4.919-5.944 1.993-15.01-5.003zm-23.576 7.947 14.838-4.946 14.838 4.946-14.838 4.947zm-9.16-3.044 7.174-2.405 7.459-2.5a.958.958 0 0 1 .627.002l5.693 1.909-15.001 5zm5.943 4.08 15.01 5.003-5.695 1.908a1 1 0 0 1 -.635 0l-14.619-4.92zm1.724 26.126c-.4-.125-.669-.455-.669-.82v-5.491l16 4.889v6.155a5.203 5.203 0 0 1 -.608-.14zm32.663-.001-14.724 4.595c-.199.062-.404.101-.608.14v-6.155l16-4.889v5.491c0 .364-.269.694-.668.818zm.668-8.4-16 4.888v-11.65h-2v11.65l-16-4.888v-11.26l6.99 2.344a3.021 3.021 0 0 0 1.907-.001l8.103-2.716 8.102 2.716a3.006 3.006 0 0 0 1.907 0l6.991-2.344zm-7.628-10.813a1 1 0 0 1 -.635 0l-5.693-1.908 15.001-5 5.949 2.007z" fill="url(#b)" />
                    </svg>
                    <p>
                        <span className="fw-bold fs-5">Free Shipping</span> <br />
                        Free shipping on order over €50
                    </p>
                </div>
                <div className="more-item rounded bg-blue-50 p-6 text-center shadow-md hover:shadow-lg transition-shadow">
                    <svg height="96" viewBox="0 0 64 64" width="96" xmlns="http://www.w3.org/2000/svg">
                        <linearGradient id="a" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="18" x2="18" y1="21.667" y2="28.508">
                            <stop offset="0" stopColor="#6dc7ff" />
                            <stop offset="1" stopColor="#e6abff" />
                        </linearGradient>
                        <linearGradient id="b">
                            <stop offset="0" stopColor="#1a6dff" />
                            <stop offset="1" stopColor="#c822ff" />
                        </linearGradient>
                        <linearGradient id="c" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="32" x2="32" y1="4.5" y2="59.026" href="#b" />
                        <linearGradient id="d" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="45" x2="45" y1="4.5" y2="59.026" href="#b" />
                        <linearGradient id="e" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="34.353" x2="34.353" y1="4.5" y2="59.026" href="#b" />
                        <linearGradient id="f" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="20.938" x2="20.938" y1="4.5" y2="59.026" href="#b" />
                        <linearGradient id="g" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="28.001" x2="28.001" y1="4.5" y2="59.026" href="#b" />
                        <linearGradient id="h" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="36" x2="36" y1="4.5" y2="59.026" href="#b" />
                        <linearGradient id="i" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="28" x2="28" y1="4.5" y2="59.026" href="#b" />
                        <linearGradient id="j" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="20" x2="20" y1="4.5" y2="59.026" href="#b" />
                        <path d="m15 28v-5a1 1 0 0 1 1-1h5z" fill="url(#a)" />
                        <path d="m57 18c0-6.617-5.383-12-12-12s-12 5.383-12 12h-19c-1.654 0-3 1.346-3 3v1h-2c-1.103 0-2 .897-2 2v28c0 1.103.897 2 2 2h2v1c0 1.654 1.346 3 3 3h28c1.654 0 3-1.346 3-3v-1h2c1.103 0 2-.897 2-2v-22.7c4.653-1.653 8-6.087 8-11.3zm-48 34v-28h2v28zm33 4h-28a1 1 0 0 1 -1-1v-34a1 1 0 0 1 1-1h19v10h10v25a1 1 0 0 1 -1 1zm5-4h-2v-22c.683 0 1.348-.071 2-.181zm-2-24h-10v-10c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10z" fill="url(#c)" />
                        <path d="m43.25 20.586-3.293-3.293-1.414 1.414 4.707 4.707 8.207-8.207-1.414-1.414z" fill="url(#d)" />
                        <path d="m34.353 36a4.002 4.002 0 0 1 -3.667-2.399l-1.832.803a6.004 6.004 0 0 0 10.999-.004l-1.832-.8a4.005 4.005 0 0 1 -3.668 2.4z" fill="url(#e)" />
                        <path d="m25.779 34.249-1.938-.498a2.995 2.995 0 0 1 -2.904 2.249 3 3 0 0 1 -2.905-2.247l-1.936.5a4.997 4.997 0 0 0 4.841 3.747 4.998 4.998 0 0 0 4.842-3.751z" fill="url(#f)" />
                        <path d="m32.331 41.499a5.017 5.017 0 0 1 -4.331 2.501 5.023 5.023 0 0 1 -4.331-2.499l-1.73 1.002a7.025 7.025 0 0 0 6.061 3.497 7.025 7.025 0 0 0 6.063-3.499z" fill="url(#g)" />
                        <path d="m34 52h4v2h-4z" fill="url(#h)" />
                        <path d="m26 52h4v2h-4z" fill="url(#i)" />
                        <path d="m18 52h4v2h-4z" fill="url(#j)" />
                    </svg>
                    <p>
                        <span className="fw-bold fs-5">Peace of Mind</span> <br />
                        30 days money back guarantee
                    </p>
                </div>
                <div className="more-item rounded bg-blue-50 p-6 text-center shadow-md hover:shadow-lg transition-shadow">
                    <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 64 64"><linearGradient id="a" x1="30" x2="30" y1="2" y2="62.513" gradientUnits="userSpaceOnUse" spreadMethod="reflect"><stop offset="0" stop-color="#1a6dff" /><stop offset="1" stop-color="#c822ff" /></linearGradient><path fill="url(#a)" d="M30 32c-3.309 0-6 2.691-6 6a5.999 5.999 0 0 0 3 5.188V45c0 1.654 1.346 3 3 3s3-1.346 3-3v-1.812A5.999 5.999 0 0 0 36 38c0-3.309-2.691-6-6-6zm1 12v1c0 .551-.449 1-1 1s-1-.449-1-1v-1h2zm-1-2c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4z" /><linearGradient id="b" x1="34" x2="34" y1="2" y2="62.513" gradientUnits="userSpaceOnUse" spreadMethod="reflect"><stop offset="0" stop-color="#1a6dff" /><stop offset="1" stop-color="#c822ff" /></linearGradient><path fill="url(#b)" d="M50 35.202V28c0-2.757-2.243-5-5-5h-4v-2c0-1.103-.897-2-2-2h-1v-8c0-4.411-3.589-8-8-8s-8 3.589-8 8v8h-1c-1.103 0-2 .897-2 2v2h-4c-2.757 0-5 2.243-5 5v24c0 2.757 2.243 5 5 5h28.051c.252 2.244 2.139 4 4.449 4 2.481 0 4.5-2.019 4.5-4.5v-2.343c3.617-1.58 6-5.174 6-9.157 0-4.829-3.441-8.869-8-9.798zM39 23h-4v-2h4v2zM24 11c0-3.309 2.691-6 6-6s6 2.691 6 6v8h-1c-1.103 0-2 .897-2 2v2h-6v-2c0-1.103-.897-2-2-2h-1v-8zm-3 10h4v2h-4v-2zm15 32H24c-1.103 0-2 .897-2 2h-7c-1.654 0-3-1.346-3-3V28c0-1.654 1.346-3 3-3h30c1.654 0 3 1.346 3 3v7c-5.514 0-10 4.486-10 10 0 3.604 1.9 6.864 5 8.651V55h-5c0-1.103-.897-2-2-2zm14.666-.466-.666.237V56.5c0 1.378-1.122 2.5-2.5 2.5S45 57.878 45 56.5v-4.066l-.554-.276A7.958 7.958 0 0 1 40 45c0-4.411 3.589-8 8-8s8 3.589 8 8a8.01 8.01 0 0 1-5.334 7.534z" /><linearGradient id="c" x1="48" x2="48" y1="39.75" y2="50.378" gradientUnits="userSpaceOnUse" spreadMethod="reflect"><stop offset="0" stop-color="#6dc7ff" /><stop offset="1" stop-color="#e6abff" /></linearGradient><path fill="url(#c)" d="M48 40a5 5 0 1 0 0 10 5 5 0 1 0 0-10Z" /></svg>
                    <p>
                        <span className="fw-bold fs-5">100% Payment Secure</span> <br />
                        Your payment are safe with us.
                    </p>
                </div>
                <div className="more-item rounded bg-blue-50 p-6 text-center shadow-md hover:shadow-lg transition-shadow">
                    <svg height="96" viewBox="0 0 64 64" width="96" xmlns="http://www.w3.org/2000/svg">
                        <linearGradient id="a"><stop offset="0" stop-color="#1a6dff" /><stop offset="1" stop-color="#c822ff" /></linearGradient>
                        <linearGradient id="b" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="32" x2="32" href="#a" y1="5.333" y2="59.507" />
                        <linearGradient id="c" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="45" x2="45" href="#a" y1="5.333" y2="59.507" />
                        <linearGradient id="d" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="27" x2="27" href="#a" y1="5.333" y2="59.507" />
                        <linearGradient id="e" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="29" x2="29" href="#a" y1="5.333" y2="59.507" />
                        <linearGradient id="f" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="31" x2="31" href="#a" y1="5.333" y2="59.507" />
                        <linearGradient id="g" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="29" x2="29" href="#a" y1="5.335" y2="59.506" />
                        <linearGradient id="h" gradientUnits="userSpaceOnUse" spreadMethod="reflect" x1="16" x2="16" y1="25.834" y2="36.835">
                            <stop offset="0" stopColor="#6dc7ff" />
                            <stop offset="1" stopColor="#e6abff" />
                        </linearGradient>
                        <path d="m58 19.001a12.89 12.89 0 0 0 -3.985-9.366 12.897 12.897 0 0 0 -9.521-3.624c-6.745.256-12.228 5.739-12.484 12.484-.007.169.006.505.006.505h-10.016c-8.822 0-16 7.178-16 16 0 8.667 6.927 15.746 15.535 15.993l5.097 5.927c.572.686 1.435 1.08 2.368 1.08s1.796-.394 2.357-1.067l5.107-5.939c8.609-.248 15.536-7.327 15.536-15.994 0-1.01-.1-2-.287-3h6.287zm-8 15.999c0 7.72-6.28 14-14 14h-.459l-5.71 6.641c-.381.457-1.27.47-1.673-.013l-5.699-6.628h-.459c-7.72 0-14-6.28-14-14s6.28-14 14-14h10.157c.402 3 1.592 5.057 3.477 7.016a12.89 12.89 0 0 0 9.366 3.984h4.673c.213 1 .327 1.987.327 3zm6-5h-11a10.908 10.908 0 0 1 -7.926-3.372 10.92 10.92 0 0 1 -3.066-8.057c.213-5.611 4.951-10.35 10.562-10.563a10.915 10.915 0 0 1 8.058 3.066 10.912 10.912 0 0 1 3.372 7.927z" fill="url(#b)" />
                        <path d="m45 23a2 2 0 1 0 0 4 2 2 0 1 0 0-4z" fill="url(#c)" />
                        <path d="m24 26h6v2h-6z" fill="url(#d)" />
                        <path d="m24 30h10v2h-10z" fill="url(#e)" />
                        <path d="m24 34h14v2h-14z" fill="url(#f)" />
                        <path d="m12 38h34v2h-34z" fill="url(#g)" />
                        <path d="m19 42h20v2h-20z" fill="url(#e)" />
                        <path d="m45 12c-2.206 0-4 2-4 4h2c0-1 .897-2 2-2s2 .897 2 2-.897 2-2 2h-1v3h2v-1.126c1-.444 3-2.013 3-3.873a4.004 4.004 0 0 0 -4-4.001z" fill="url(#c)" />
                        <path d="m20 36h-8v-2a8 8 0 0 1 8-8z" fill="url(#h)" />
                    </svg>
                    <p>
                        <span className="fw-bold fs-5">Support 24/7</span> <br />
                        24/7 Online support
                    </p>
                </div>
            </div>
        </section>
    );
};

export default MoreInfor;