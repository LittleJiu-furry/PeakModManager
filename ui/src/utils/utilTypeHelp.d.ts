declare interface TickController {
    start: () => void;
    pause: () => void;
    resume: () => void;
    stop: () => void;
    remaining: import("vue").Ref<number>;
}