// tslint:disable: no-any

// CSS
declare module '*.scss' {
    const styles: Record<string, string>;
    export default styles;
}
declare module '*.css' {
    const styles: Record<string, string>;
    export default styles;
}

// Images
declare module '*.png' {
    const content: string;
    export default content;
}
declare module '*.svg' {
    const content: string;
    export default content;
}
declare module '*.jpg' {
    const content: string;
    export default content;
}
declare module '*.jpeg' {
    const content: string;
    export default content;
}
declare module '*.gif' {
    const content: string;
    export default content;
}
