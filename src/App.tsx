import "./App.css";
import { Sidebar } from "./components/Sidebar";
import { PresetRide } from "./components/PresetRide";
import { MantineProvider } from "@mantine/core";
import { useStore } from "./store";
import { Empty } from "./components/Empty";

function App() {
	const presetRides = useStore((state) => state.presetRides);
	const isEmpty = Object.values(presetRides).length === 0;

	return (
		<MantineProvider defaultColorScheme="dark">
			<main className="main">
				<Sidebar />
				{isEmpty ? <Empty /> : <PresetRide />}
			</main>
		</MantineProvider>
	);
}

export default App;
