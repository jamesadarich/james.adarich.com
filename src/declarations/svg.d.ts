declare module "*.svg" {
    const content: React.ComponentType<React.DetailedHTMLProps<React.HTMLAttributes<SVGElement>, SVGElement>>;
    export default content;
}
