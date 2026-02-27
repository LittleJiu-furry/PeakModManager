declare interface AsideItem {
    id: number;
    name: string;
    icon: string;
    url?: string;
    action?: (item: AsideItem) => void;
}