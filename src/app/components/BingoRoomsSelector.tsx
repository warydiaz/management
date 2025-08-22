import { useState } from "react";
import { BingoRoom } from "./types";
import { ChevronDown } from "lucide-react";

interface Props {
  bingoRooms: BingoRoom[];
  selectedRooms: string[];
  setSelectedRooms: (rooms: string[]) => void;
}

export default function BingoRoomsSelector({
  bingoRooms,
  selectedRooms,
  setSelectedRooms,
}: Props) {
  const [open, setOpen] = useState(false);

  const toggleRoom = (roomName: string) => {
    if (selectedRooms.includes(roomName)) {
      setSelectedRooms(selectedRooms.filter((r) => r !== roomName));
    } else {
      setSelectedRooms([...selectedRooms, roomName]);
    }
  };

  return (
    <div className="relative w-64">
      {/* Label */}
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Bingo Rooms
      </label>

      {/* Dropdown button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full border rounded px-3 py-2 flex justify-between items-center bg-white shadow-sm"
      >
        <span>
          {selectedRooms.length > 0
            ? selectedRooms.join(", ")
            : "Select Bingo Rooms"}
        </span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown menu */}
      {open && (
        <div className="absolute mt-1 w-full border rounded bg-white shadow-lg z-10 max-h-60 overflow-y-auto">
          {bingoRooms.map((room) => (
            <label
              key={room.productSeasonalName}
              className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedRooms.includes(room.productSeasonalName)}
                onChange={() => toggleRoom(room.productSeasonalName)}
              />
              {room.productSeasonalName}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
