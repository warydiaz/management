import { BingoRoom } from "./types";

interface Props {
  bingoRooms: BingoRoom[];
  selectedRooms: string[];
  setSelectedRooms: (rooms: string[]) => void;
}

export default function BingoRoomsSelector({ bingoRooms, selectedRooms, setSelectedRooms }: Props) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Bingo Rooms</label>
      <div className="flex flex-col gap-2">
        {bingoRooms.map((room) => (
          <label key={room.productSeasonalName} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedRooms.includes(room.productSeasonalName)}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedRooms([...selectedRooms, room.productSeasonalName]);
                } else {
                  setSelectedRooms(selectedRooms.filter(r => r !== room.productSeasonalName));
                }
              }}
            />
            {room.productSeasonalName}
          </label>
        ))}
      </div>
    </div>
  );
}
