import { InfoWindowF } from "@react-google-maps/api";
import one from "./1.webp";
import two from "./2.webp";
import three from "./3.webp";

const imgList = {
  one: one,
  two: two,
  three: three,
};
export default function Info(props) {
  const { selectedPlace, setSelectedPlace } = props;

  const checkSchedule = (dateObject) => {
    const currentTime = new Date();
    const currentDay = currentTime.toLocaleString("de-de", { weekday: "long" });

    const year = currentTime.getFullYear();
    const month = ("0" + (currentTime.getMonth() + 1)).slice(-2);
    const day = ("0" + currentTime.getDate()).slice(-2);
    const formattedDate = year + "-" + month + "-" + day;

    const startTime = new Date(`${formattedDate}T${dateObject.start}`);
    const endTime = new Date(`${formattedDate}T${dateObject.end}`);

    return (
      currentDay === dateObject.day &&
      currentTime >= startTime &&
      currentTime <= endTime
    );
  };

  return (
    <InfoWindowF
      position={{
        lat: selectedPlace.latitude,
        lng: selectedPlace.longitude,
      }}
      zIndex={1}
      options={{
        pixelOffset: {
          width: 0,
          height: -40,
          equals: () => false,
        },
      }}
    >
      <div className="info" onClick={() => setSelectedPlace(null)}>
        {
          <div class="card">
            <h3>{selectedPlace.name}</h3>
            <img src={imgList[selectedPlace.img]} alt={selectedPlace.name} />
            <div class="card-body">
              <h3>Adress : {selectedPlace.address}</h3>
              <a href={selectedPlace.link}>Website</a>

              <ul>
                {selectedPlace.timeList.map((t) => (
                  <>
                    <li className={`${checkSchedule(t) ? "active" : ""}`}>
                      <h3>{`${t.day.substr(0, 2)} ${t.start} - ${t.end}`}</h3>
                    </li>
                  </>
                ))}
              </ul>
            </div>
          </div>
        }
      </div>
    </InfoWindowF>
  );
}