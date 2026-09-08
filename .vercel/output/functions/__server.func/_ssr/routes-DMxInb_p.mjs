import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as RotateCcw, c as MessageSquare, i as Smartphone, l as Check, n as Volume2, o as Play, s as Pause, t as VolumeX } from "../_libs/lucide-react.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DMxInb_p.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 font-medium transition-[transform,background-color,color,box-shadow] duration-150 ease-out select-none disabled:pointer-events-none disabled:opacity-50 active:not-disabled:scale-[0.96]", {
	variants: {
		variant: {
			default: "bg-forest text-ivory hover:bg-forest-deep",
			ghost: "bg-transparent text-ivory hover:bg-ivory/10",
			outline: "bg-transparent text-ink hover:bg-paper",
			ivory: "bg-ivory text-ink hover:bg-cream"
		},
		size: {
			default: "h-11 rounded-full px-5 text-sm",
			sm: "h-9 rounded-full px-4 text-sm",
			icon: "size-11 rounded-full",
			pill: "h-10 rounded-full px-4 text-sm"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
var SCENES = [
	{
		id: "open",
		label: "Open",
		start: 0,
		end: 5.8
	},
	{
		id: "gap",
		label: "The gap",
		start: 5.8,
		end: 13.6
	},
	{
		id: "detect",
		label: "Detect",
		start: 13.6,
		end: 21.8
	},
	{
		id: "ping",
		label: "Ping",
		start: 21.8,
		end: 35.2
	},
	{
		id: "yes",
		label: "Confirm",
		start: 35.2,
		end: 42.8
	},
	{
		id: "close",
		label: "Filled",
		start: 42.8,
		end: 50
	}
];
var CAPTIONS = [
	{
		start: .6,
		end: 5.4,
		kicker: "Dental confirmation",
		line: "Empty slots, filled in seconds."
	},
	{
		start: 6.2,
		end: 13.1,
		kicker: "Tuesday · 2:30 PM",
		line: "A last-minute cancellation."
	},
	{
		start: 14,
		end: 21.3,
		kicker: "Lumen sees the gap",
		line: "The empty chair never waits."
	},
	{
		start: 22.4,
		end: 28.8,
		kicker: "SMS · WhatsApp",
		line: "The waitlist is written, instantly."
	},
	{
		start: 29.2,
		end: 34.8,
		kicker: "Maya Chen",
		line: "One reply holds the chair."
	},
	{
		start: 35.6,
		end: 42.2,
		kicker: "Confirmed",
		line: "Booked before the hour turns."
	},
	{
		start: 43.2,
		end: 49.4,
		kicker: "Lumen",
		line: "Confirm. Fill. Repeat."
	}
];
var CUES = [
	{
		at: 1.05,
		kind: "open"
	},
	{
		at: 8.6,
		kind: "cancel"
	},
	{
		at: 16.2,
		kind: "detect"
	},
	{
		at: 24.4,
		kind: "send"
	},
	{
		at: 31.4,
		kind: "reply"
	},
	{
		at: 37.4,
		kind: "book"
	},
	{
		at: 44.2,
		kind: "close"
	}
];
function clamp01(n) {
	return Math.max(0, Math.min(1, n));
}
function remap(t, a, b) {
	if (b === a) return t >= b ? 1 : 0;
	return clamp01((t - a) / (b - a));
}
function mix(a, b, t) {
	return a + (b - a) * t;
}
function easeOutCubic(t) {
	return 1 - (1 - t) ** 3;
}
function easeInOutCubic(t) {
	return t < .5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}
function smoothstep(a, b, t) {
	const x = remap(t, a, b);
	return x * x * (3 - 2 * x);
}
function local(t, start, end) {
	return remap(t, start, end);
}
function sceneOpacity(t, start, end, fade = .65) {
	if (t < start - fade || t > end + fade) return 0;
	if (t < start) return smoothstep(start - fade, start, t);
	if (t > end) return 1 - smoothstep(end, end + fade, t);
	return 1;
}
function typewriter(text, p, start, end) {
	const u = remap(p, start, end);
	const n = Math.round(u * text.length);
	return {
		text: text.slice(0, n),
		done: u >= 1,
		caret: u > 0 && u < 1
	};
}
function captionAt(t) {
	for (let i = CAPTIONS.length - 1; i >= 0; i--) {
		const c = CAPTIONS[i];
		if (t >= c.start && t <= c.end) {
			const p = remap(t, c.start, c.end);
			return {
				...c,
				enter: smoothstep(0, .18, p),
				exit: 1 - smoothstep(.86, 1, p)
			};
		}
	}
	return null;
}
function activeScene(t) {
	for (const s of SCENES) if (t >= s.start && t < s.end) return s;
	return SCENES[SCENES.length - 1];
}
function formatTime(t) {
	const s = Math.max(0, Math.min(50, t));
	return `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, "0")}`;
}
function useFilmClock(duration, playing) {
	const [t, setT] = (0, import_react.useState)(0);
	const tRef = (0, import_react.useRef)(0);
	const last = (0, import_react.useRef)(0);
	(0, import_react.useEffect)(() => {
		if (!playing) {
			last.current = 0;
			return;
		}
		last.current = performance.now();
		let raf = 0;
		const loop = (now) => {
			const prev = last.current || now;
			const dt = Math.min(.05, (now - prev) / 1e3);
			last.current = now;
			tRef.current = (tRef.current + dt) % duration;
			setT(tRef.current);
			raf = requestAnimationFrame(loop);
		};
		raf = requestAnimationFrame(loop);
		return () => cancelAnimationFrame(raf);
	}, [playing, duration]);
	return {
		t,
		seek: (0, import_react.useCallback)((next) => {
			const wrapped = (next % duration + duration) % duration;
			tRef.current = wrapped;
			setT(wrapped);
		}, [duration]),
		tRef
	};
}
function crossed(prev, next, mark) {
	if (next < prev) return next >= mark || prev < mark;
	return prev < mark && next >= mark;
}
var MSG = "Hi Maya — a 2:30 PM opening just appeared at Clementine Dental. Reply YES to take the slot.";
function DeviceFrame({ channel, children, p, className }) {
	const show = easeOutCubic(clamp01(p));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("film-device", className),
		style: {
			opacity: show,
			transform: `translate3d(0, ${(1 - show) * 24}px, 0) scale(${.97 + .03 * show})`
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "film-device-bezel",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "film-device-notch" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: cn("film-device-head", channel),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "film-device-channel",
							children: [channel === "whatsapp" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, {
								className: "size-3.5",
								strokeWidth: 2
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, {
								className: "size-3.5",
								strokeWidth: 2
							}), channel === "whatsapp" ? "WhatsApp" : "SMS"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Clementine Dental" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "online" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "film-device-body",
					children
				})
			]
		})
	});
}
function ChatTranscript({ p }) {
	const typed = typewriter(MSG, p, .16, .46);
	const delivered = remap(p, .46, .54);
	const typing = remap(p, .58, .7);
	const reply = remap(p, .7, .8);
	const booked = remap(p, .84, .94);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "film-chat",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "film-bubble out",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [typed.text, typed.caret ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "film-caret" }) : null] }), delivered > .2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "film-meta",
					style: { opacity: delivered },
					children: "Delivered · 2:31 PM"
				}) : null]
			}),
			typing > 0 && reply < .15 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "film-bubble in typing",
				style: { opacity: Math.min(1, typing * 3) },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {})
				]
			}) : null,
			reply > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "film-bubble in",
				style: {
					opacity: easeOutCubic(reply),
					transform: `translateY(${(1 - easeOutCubic(reply)) * 10}px)`
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "YES" })
			}) : null,
			booked > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "film-system",
				style: { opacity: easeOutCubic(booked) },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
					className: "size-3.5",
					strokeWidth: 2.2
				}), "You're booked. See you Tuesday at 2:30."]
			}) : null
		]
	});
}
function SmsCard({ p }) {
	const show = easeOutCubic(remap(p, .22, .4));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "film-sms",
		style: {
			opacity: show,
			transform: `translate3d(${(1 - show) * -18}px, 0, 0)`
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "film-sms-kicker",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, {
					className: "size-3.5",
					strokeWidth: 2
				}), "SMS · delivered"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "film-sms-from",
				children: "Clementine Dental"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "film-sms-body",
				children: "2:30 PM is open tomorrow. Reply YES to confirm, IGNORE to pass."
			})
		]
	});
}
function AppointmentCard({ p, phase }) {
	const show = easeOutCubic(clamp01(p * 1.6));
	const cancel = phase === "booked-then-cancel" ? remap(p, .28, .52) : 0;
	const emptied = phase === "booked-then-cancel" ? remap(p, .52, .72) : phase === "open" ? 1 : 0;
	const filled = phase === "filled" ? 1 : 0;
	let rowName = "Elena V.";
	let rowKind = "hygiene";
	if (filled > .5) {
		rowName = "Maya Chen";
		rowKind = "held";
	} else if (emptied > .5) {
		rowName = "Open slot";
		rowKind = "available";
	} else if (cancel > .55) rowKind = "cancelled";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "film-cal",
		style: {
			opacity: show,
			transform: `translate3d(0, ${(1 - show) * 22}px, 0)`
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "film-cal-head",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Tuesday" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "8 September" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Clementine" })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
			className: "film-cal-list",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", { children: "9:00" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Samir R." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "consult" })
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", { children: "10:30" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Open" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "buffer" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: cn("hero", emptied > .5 && filled < .5 && "open", filled > .5 && "filled"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", { children: "14:30" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							style: {
								textDecoration: cancel > .45 && filled < .5 && emptied < .5 ? "line-through" : "none",
								opacity: cancel > .45 && emptied < .5 ? .55 : 1
							},
							children: rowName
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
							className: cn((emptied > .5 && filled < .5 || filled > .5) && "accent"),
							children: filled > .5 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
								className: "size-3",
								strokeWidth: 2.4
							}), rowKind] }) : rowKind
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", { children: "16:00" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Jules K." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "polish" })
				] })
			]
		})]
	});
}
function WorkflowGraph({ p }) {
	const draw = easeInOutCubic(remap(p, .08, .55));
	const pulseX = mix(88, 632, easeInOutCubic(remap(p, .2, .9)));
	const nodes = [
		{
			x: 88,
			label: "Calendar",
			on: remap(p, .08, .2)
		},
		{
			x: 268,
			label: "Lumen",
			on: remap(p, .28, .42)
		},
		{
			x: 448,
			label: "Waitlist",
			on: remap(p, .46, .6)
		},
		{
			x: 632,
			label: "Message",
			on: remap(p, .66, .8)
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "film-flow",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				viewBox: "0 0 720 110",
				className: "film-flow-svg",
				"aria-hidden": true,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M88 55 H632",
						fill: "none",
						stroke: "var(--color-foam)",
						strokeWidth: "1.8",
						strokeDasharray: "544",
						strokeDashoffset: 544 * (1 - draw),
						opacity: "0.85"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: pulseX,
						cy: "55",
						r: "6",
						fill: "var(--color-ivory)",
						opacity: remap(p, .18, .3)
					}),
					nodes.map((n) => {
						const on = easeOutCubic(n.on);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
							transform: `translate(${n.x}, 55)`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								r: mix(11, 17, on),
								fill: "var(--color-forest)",
								stroke: "var(--color-ivory)",
								strokeWidth: "1.8"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								r: "4.5",
								fill: "var(--color-ivory)",
								opacity: .45 + on * .55
							})]
						}, n.label);
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "film-flow-labels",
				children: nodes.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					style: { opacity: .5 + easeOutCubic(n.on) * .5 },
					children: n.label
				}, n.label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Waitlist, { p })
		]
	});
}
function Waitlist({ p }) {
	const show = easeOutCubic(remap(p, .42, .62));
	const pick = remap(p, .68, .86);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "film-wait",
		style: {
			opacity: show,
			transform: `translateY(${(1 - show) * 14}px)`
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Waitlist · hygiene" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: pick > .4 ? "picked" : void 0,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Maya Chen" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "WhatsApp · 3 days" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Luis Ortega" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "SMS · 1 week" })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Priya N." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "SMS · 2 weeks" })] })
		] })]
	});
}
function PingDemo() {
	const [channel, setChannel] = (0, import_react.useState)("whatsapp");
	const [running, setRunning] = (0, import_react.useState)(false);
	const [p, setP] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		if (!running) return;
		const start = performance.now();
		const dur = 3800;
		let raf = 0;
		const loop = (now) => {
			const u = Math.min(1, (now - start) / dur);
			setP(u);
			if (u < 1) raf = requestAnimationFrame(loop);
		};
		raf = requestAnimationFrame(loop);
		return () => cancelAnimationFrame(raf);
	}, [running]);
	function reset() {
		setRunning(false);
		setP(0);
	}
	const booked = p >= .94;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "demo",
		id: "try",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "demo-copy",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow",
					children: "Try the ping"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Send the opening. Watch it fill." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A 2:30 hygiene slot just opened at Clementine Dental. Lumen writes Maya on the channel she actually answers." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "demo-switch",
					role: "tablist",
					"aria-label": "Channel",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						role: "tab",
						"aria-selected": channel === "whatsapp",
						className: cn(channel === "whatsapp" && "on"),
						onClick: () => {
							setChannel("whatsapp");
							reset();
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, {
							className: "size-4",
							strokeWidth: 1.8
						}), "WhatsApp"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						role: "tab",
						"aria-selected": channel === "sms",
						className: cn(channel === "sms" && "on"),
						onClick: () => {
							setChannel("sms");
							reset();
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, {
							className: "size-4",
							strokeWidth: 1.8
						}), "SMS"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "demo-meta",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Maya Chen" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Tue 2:30 PM" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Hygiene" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "demo-actions",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => setRunning(true),
						disabled: running,
						children: "Send confirmation"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						onClick: reset,
						disabled: !running && p === 0,
						children: "Reset"
					})]
				}),
				booked ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "demo-done",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
						className: "size-4",
						strokeWidth: 2.2
					}), "Slot held. Chair filled."]
				}) : null
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "demo-stage",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeviceFrame, {
				channel,
				p: 1,
				children: p === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "film-chat",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "demo-idle",
						children: "Waiting for an empty slot."
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatTranscript, { p })
			})
		})]
	});
}
var ctx = null;
var master = null;
function audio() {
	if (typeof window === "undefined") return null;
	if (!ctx) {
		const AC = window.AudioContext || window.webkitAudioContext;
		if (!AC) return null;
		ctx = new AC();
		master = ctx.createGain();
		master.gain.value = .7;
		master.connect(ctx.destination);
	}
	return ctx;
}
function tone(freq, when, dur, gain, type = "sine") {
	const c = audio();
	if (!c || !master) return;
	const o = c.createOscillator();
	const g = c.createGain();
	o.type = type;
	o.frequency.value = freq;
	g.gain.setValueAtTime(0, when);
	g.gain.linearRampToValueAtTime(gain, when + .018);
	g.gain.exponentialRampToValueAtTime(1e-4, when + dur);
	o.connect(g).connect(master);
	o.start(when);
	o.stop(when + dur + .02);
}
async function unlockAudio() {
	const c = audio();
	if (c && c.state === "suspended") await c.resume();
}
function playCue(kind) {
	const c = audio();
	if (!c || !master) return;
	const t = c.currentTime;
	switch (kind) {
		case "open":
			tone(392, t, .9, .045);
			tone(588, t + .08, .8, .03);
			break;
		case "cancel":
			tone(349.23, t, .45, .04);
			tone(311.13, t + .12, .55, .035);
			break;
		case "detect":
			tone(523.25, t, .35, .04);
			tone(659.25, t + .14, .4, .035);
			break;
		case "send":
			tone(698.46, t, .22, .05, "triangle");
			tone(880, t + .09, .28, .03);
			break;
		case "reply":
			tone(659.25, t, .2, .045, "triangle");
			break;
		case "book":
			tone(523.25, t, .7, .04);
			tone(659.25, t + .04, .7, .035);
			tone(783.99, t + .08, .85, .04);
			break;
		case "close":
			tone(392, t, 1.1, .04);
			tone(493.88, t + .06, 1, .03);
			tone(587.33, t + .12, 1.2, .035);
	}
}
function Still({ src, p, alt, className }) {
	const scale = 1.05 + p * .07;
	const x = -1.6 + p * 3.2;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src,
		alt,
		className: cn("film-still", className),
		style: { transform: `scale(${scale}) translate3d(${x}%, 0, 0)` }
	});
}
function BgVideo({ src, play, opacity = 1 }) {
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const v = ref.current;
		if (!v) return;
		if (play) {
			const run = v.play();
			if (run) run.catch(() => {});
		} else v.pause();
	}, [play]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
		ref,
		src,
		muted: true,
		loop: true,
		playsInline: true,
		preload: "auto",
		className: "film-still",
		style: { opacity }
	});
}
function Wash({ amount = .42, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("film-wash", className),
		style: { background: `color-mix(in oklab, var(--color-ink) ${amount * 100}%, transparent)` }
	});
}
function Grain() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "film-grain",
		"aria-hidden": true
	});
}
function Vignette() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "film-vignette",
		"aria-hidden": true
	});
}
function LogoMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		className,
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "32",
				height: "32",
				rx: "8",
				fill: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "9",
				y: "7",
				width: "14",
				height: "18",
				rx: "3",
				fill: "var(--color-ivory)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "12",
				y: "14.5",
				width: "8",
				height: "7",
				rx: "1.6",
				fill: "currentColor"
			})
		]
	});
}
function Appear({ p, from = 0, span = .18, children, className, dy = 18 }) {
	const t = 1 - Math.pow(1 - Math.max(0, Math.min(1, (p - from) / span)), 3);
	const style = {
		opacity: t,
		transform: `translate3d(0, ${(1 - t) * dy}px, 0)`
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className,
		style,
		children
	});
}
function SceneLayer({ t, start, end, children }) {
	const o = sceneOpacity(t, start, end);
	if (o <= .001) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "film-scene",
		style: { opacity: o },
		children: [
			children,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grain, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Vignette, {})
		]
	});
}
function OpenScene({ t, playing }) {
	const p = local(t, 0, 5.8);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SceneLayer, {
		t,
		start: 0,
		end: 5.8,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Still, {
				src: "/art/operatory-empty.jpg",
				p,
				alt: ""
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BgVideo, {
				src: "/art/chair-push.mp4",
				play: playing && p > 0 && p < 1
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wash, { amount: .38 }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "film-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Appear, {
						p,
						from: .08,
						span: .2,
						className: "film-mark",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoMark, { className: "size-12 text-ivory" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Appear, {
						p,
						from: .18,
						span: .22,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "film-title",
							children: "Lumen"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Appear, {
						p,
						from: .34,
						span: .2,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "film-rule",
							style: { transform: `scaleX(${Math.min(1, Math.max(0, (p - .34) / .28))})` }
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Appear, {
						p,
						from: .42,
						span: .22,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "film-sub",
							children: "AI confirmation for dental clinics"
						})
					})
				]
			})
		]
	});
}
function GapScene({ t }) {
	const p = local(t, 5.8, 13.6);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SceneLayer, {
		t,
		start: 5.8,
		end: 13.6,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Still, {
				src: "/art/reception.jpg",
				p,
				alt: "Quiet dental reception in morning light"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wash, { amount: .46 }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "film-stage-pad",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppointmentCard, {
					p,
					phase: "booked-then-cancel"
				})
			})
		]
	});
}
function DetectScene({ t, playing }) {
	const p = local(t, 13.6, 21.8);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SceneLayer, {
		t,
		start: 13.6,
		end: 21.8,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BgVideo, {
				src: "/art/nodes-pulse.mp4",
				play: playing && p > 0 && p < 1,
				opacity: .9
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Still, {
				src: "/art/nodes.jpg",
				p,
				alt: "",
				className: "mix-multiply opacity-40"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wash, { amount: .72 }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "film-stage-pad film-detect",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Appear, {
					p,
					from: .02,
					span: .16,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "film-chip",
						children: "Empty slot detected · 14:30 hygiene"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkflowGraph, { p })]
			})
		]
	});
}
function PingScene({ t }) {
	const p = local(t, 21.8, 35.2);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SceneLayer, {
		t,
		start: 21.8,
		end: 35.2,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Still, {
				src: "/art/phone-hands.jpg",
				p,
				alt: "Hands holding a phone"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wash, { amount: .55 }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "film-ping",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SmsCard, { p }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeviceFrame, {
					channel: "whatsapp",
					p: remapSafe(p, .02, 1),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatTranscript, { p })
				})]
			})
		]
	});
}
function remapSafe(p, a, b) {
	return Math.max(0, Math.min(1, (p - a) / (b - a)));
}
function YesScene({ t }) {
	const p = local(t, 35.2, 42.8);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SceneLayer, {
		t,
		start: 35.2,
		end: 42.8,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Still, {
				src: "/art/operatory-empty.jpg",
				p,
				alt: "Empty dental chair in afternoon light"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wash, { amount: .5 }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "film-yes",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppointmentCard, {
					p: Math.min(1, p * 1.4),
					phase: "filled"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeviceFrame, {
					channel: "whatsapp",
					p: remapSafe(p, 0, .4),
					className: "film-device-compact",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatTranscript, { p: .95 })
				})]
			})
		]
	});
}
function CloseScene({ t }) {
	const p = local(t, 42.8, 50);
	const count = Math.round(8 * Math.min(1, Math.max(0, (p - .18) / .35)));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SceneLayer, {
		t,
		start: 42.8,
		end: 50,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Still, {
				src: "/art/operatory-filled.jpg",
				p,
				alt: "Patient resting in a sunlit dental chair"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wash, { amount: .48 }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "film-center film-close",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Appear, {
						p,
						from: .08,
						span: .18,
						className: "film-mark",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoMark, { className: "size-10 text-ivory" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Appear, {
						p,
						from: .16,
						span: .2,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "film-title film-title-sm",
							children: "Filled."
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Appear, {
						p,
						from: .32,
						span: .2,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "film-stats",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
									className: "tabular-nums",
									children: [count, "s"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "to confirm" })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "1" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "message" })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "empty chairs" })] })
							]
						})
					})
				]
			})
		]
	});
}
function FilmPlayer() {
	const [playing, setPlaying] = (0, import_react.useState)(false);
	const [muted, setMuted] = (0, import_react.useState)(true);
	const prevT = (0, import_react.useRef)(0);
	const { t, seek, tRef } = useFilmClock(50, playing);
	const caption = captionAt(t);
	const scene = activeScene(t);
	const barRef = (0, import_react.useRef)(null);
	const mutedRef = (0, import_react.useRef)(muted);
	mutedRef.current = muted;
	(0, import_react.useEffect)(() => {
		if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPlaying(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (muted || !playing) {
			prevT.current = t;
			return;
		}
		for (const cue of CUES) if (crossed(prevT.current, t, cue.at)) playCue(cue.kind);
		prevT.current = t;
	}, [
		t,
		muted,
		playing
	]);
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			const tag = e.target?.tagName;
			if (tag === "INPUT" || tag === "TEXTAREA") return;
			if (e.code === "Space") {
				e.preventDefault();
				setPlaying((p) => !p);
			} else if (e.code === "ArrowRight") seek(tRef.current + 2);
			else if (e.code === "ArrowLeft") seek(tRef.current - 2);
			else if (e.code === "KeyM") {
				const next = !mutedRef.current;
				setMuted(next);
				if (!next) unlockAudio();
			} else if (e.code === "Digit0") seek(0);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [seek, tRef]);
	async function toggleMute(next) {
		setMuted(next);
		if (!next) await unlockAudio();
	}
	function seekFromBar(clientX) {
		const el = barRef.current;
		if (!el) return;
		const r = el.getBoundingClientRect();
		const u = Math.max(0, Math.min(1, (clientX - r.left) / r.width));
		seek(u * 50);
	}
	const capA = caption ? caption.enter * caption.exit : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "film-shell",
		role: "region",
		"aria-label": "Lumen motion film",
		onClick: () => setPlaying((p) => !p),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "film-frame",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OpenScene, {
					t,
					playing
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GapScene, { t }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetectScene, {
					t,
					playing
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PingScene, { t }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YesScene, { t }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloseScene, { t }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "film-top",
					onClick: (e) => e.stopPropagation(),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "film-wordmark",
						style: { opacity: t > 5.6 ? 1 : 0 },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoMark, { className: "size-6 text-ivory" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Lumen" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "film-scene-label",
						children: scene.label
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "film-bottom",
					onClick: (e) => e.stopPropagation(),
					children: [
						caption ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "film-caption",
							style: {
								opacity: capA,
								transform: `translateY(${(1 - caption.enter) * 12}px)`
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: caption.kicker }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: caption.line })]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "film-caption" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "film-controls",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									"aria-label": playing ? "Pause" : "Play",
									onClick: () => setPlaying((p) => !p),
									children: playing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, {
										className: "size-5",
										strokeWidth: 1.8
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {
										className: "size-5 translate-x-px",
										strokeWidth: 1.8
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "film-time tabular-nums",
									children: [
										formatTime(t),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: "/" }),
										formatTime(50)
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									ref: barRef,
									className: "film-bar",
									role: "slider",
									"aria-label": "Film position",
									"aria-valuemin": 0,
									"aria-valuemax": 50,
									"aria-valuenow": Math.round(t),
									tabIndex: 0,
									onPointerDown: (e) => {
										e.target.setPointerCapture(e.pointerId);
										seekFromBar(e.clientX);
									},
									onPointerMove: (e) => {
										if (e.buttons) seekFromBar(e.clientX);
									},
									onKeyDown: (e) => {
										if (e.key === "ArrowRight") seek(t + 1);
										if (e.key === "ArrowLeft") seek(t - 1);
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { style: { width: `${t / 50 * 100}%` } })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									"aria-label": muted ? "Unmute" : "Mute",
									onClick: () => void toggleMute(!muted),
									children: muted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, {
										className: "size-5",
										strokeWidth: 1.8
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, {
										className: "size-5",
										strokeWidth: 1.8
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									"aria-label": "Restart",
									onClick: () => seek(0),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {
										className: "size-5",
										strokeWidth: 1.8
									})
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
							className: "film-chapters",
							children: SCENES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: s.id === scene.id ? "on" : void 0,
								onClick: () => {
									seek(s.start + .05);
									setPlaying(true);
								},
								children: s.label
							}) }, s.id))
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "sr-only",
			children: caption?.line ?? "Lumen dental confirmation film"
		})]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilmPlayer, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "page-rest",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "story",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "The workflow"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "When a chair goes empty, the next patient already knows." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Lumen watches the book. The moment a hygiene slot opens, it writes the waitlist on SMS and WhatsApp — and holds the chair the second they confirm." })
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "story-grid",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
							className: "story-card tall",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/art/operatory-empty.jpg",
								alt: "Empty sage treatment chair in afternoon light"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "The gap" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A cancellation at 2:30. An empty chair. Revenue sitting idle." })] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
							className: "story-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/art/phone-hands.jpg",
								alt: "Hands holding a phone on a linen table"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "The ping" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Maya gets the opening on the channel she answers." })] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
							className: "story-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/art/operatory-filled.jpg",
								alt: "Patient resting in a sunlit dental chair"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "The fill" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Yes. Booked. The afternoon is whole again." })] })]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "steps",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "Three beats"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Confirm. Fill. Repeat." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
						className: "step-list",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "01" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "A slot opens" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A last-minute cancel hits the book. Lumen sees the empty 2:30 before the front desk looks up." })
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "02" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "The patient is written" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "SMS and WhatsApp go out together — a single, calm question: would you like this chair?" })
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "03" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "They confirm" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "One YES holds the appointment. The waitlist moves. The chair does not stay empty." })
							] })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PingDemo, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "site-foot",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Lumen" }), " · Dental slot confirmation"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "SMS · WhatsApp · the empty chair, filled." })]
			})
		]
	})] });
}
//#endregion
export { Home as component };
