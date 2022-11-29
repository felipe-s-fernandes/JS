export default function NewCustomEvent(urlAddress) {
    return new CustomEvent('onstatechange', {
        detail: {url: urlAddress}
    });
};