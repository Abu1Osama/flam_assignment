import "./App.css";
import BottomSheet from "./Components/BottomSheet";
import { useState } from "react";

function App() {
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);

  const handleOpenButtonClick = () => {
    setBottomSheetOpen(true);
  };

  const handleCloseButtonClick = () => {
    setBottomSheetOpen(false);
  };

  return (
    <div className="App">
      <div className="btn">
        <button onClick={handleOpenButtonClick}>Open Bottom Sheet</button>
      </div>

      {bottomSheetOpen && (
        <BottomSheet onCloseButtonClick={handleCloseButtonClick} />
      )}
    </div>
  );
}

export default App;
