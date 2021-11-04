import { LiveblocksProvider } from "@liveblocks/react";
import { createClient } from "@liveblocks/client";
import "../styles/globals.css";

const client = createClient({
	publicApiKey: NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY,
});

function MyApp({ Component, pageProps }) {
	return (
		<LiveblocksProvider client={client}>
			<Component {...pageProps} />
		</LiveblocksProvider>
	);
}
export default MyApp;
