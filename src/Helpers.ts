export default class Helpers {
    public static applyMixin(derivedClass: any, baseClasses: Array<any>): void {
        baseClasses.forEach(baseClass => {
            Object.getOwnPropertyNames(baseClass.prototype).forEach(name => {
                Object.defineProperty(derivedClass.prototype, name, Object.getOwnPropertyDescriptor(baseClass.prototype, name));
            });
        });
    }
}
