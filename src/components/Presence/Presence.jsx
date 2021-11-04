import { useMyPresence, useOthers } from "@liveblocks/react";
import Cursor from "../Cursor/Cursor";

const COLORS = [
	"#E57373",
	"#9575CD",
	"#4FC3F7",
	"#81C784",
	"#FFF176",
	"#FF8A65",
	"#F06292",
	"#7986CB",
];

const Presence = () => {
	const [{ cursor }, updateMyPresence] = useMyPresence();
	const others = useOthers();

	return (
		<div
			style={{
				position: "fixed",
				height: "100vh",
				left: 0,
				top: 0,
        width: "100vw",
        zIndex: 5,
			}}
			onPointerMove={(event) =>
				updateMyPresence({
					cursor: {
						x: Math.round(event.clientX),
						y: Math.round(event.clientY),
					},
				})
			}
			onPointerLeave={() =>
				updateMyPresence({
					cursor: null,
				})
			}
		>
			<div
				style={{
					textAlign: "left",
					color: "#81C784",
					transform: `translateX(${cursor?.x || 0}px) translateY(${
						cursor?.y || 0
					}px)`,
				}}
			>
				{cursor ? `ME` : ""}
			</div>

			{others.map(({ connectionId, presence }) => {
				if (presence == null || presence.cursor == null) {
					return null;
				}

				return (
					<Cursor
						key={`cursor-${connectionId}`}
						color={COLORS[connectionId % COLORS.length]}
						x={presence.cursor.x}
						y={presence.cursor.y}
					/>
				);
			})}
		</div>
	);
};

export default Presence;
