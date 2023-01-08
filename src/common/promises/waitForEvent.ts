export default function waitForEvent(
  element: EventTarget,
  eventName: string,
  errorEventName?: string,
): Promise<void> {
  return new Promise((resolve, reject) => {
    element.addEventListener(eventName, () => {
      resolve();
    }, { once: true });
    if (errorEventName) {
      element.addEventListener(errorEventName, () => {
        reject();
      }, { once: true });
    }
  });
}
