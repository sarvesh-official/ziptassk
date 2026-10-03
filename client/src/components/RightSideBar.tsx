
import focusIllustration from "../assets/focus-illustration.svg";

const Sidebar = () => {
  return (
    <div className="spotify">
      <iframe
        style={{ borderRadius: "12px" }}
        src="https://open.spotify.com/embed/playlist/10HGASxr8s11KK0GS9HxLE?utm_source=generator&theme=0&si=268e7fd2df4449f6"
        width="100%"
        height="252"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        allowFullScreen
        loading="lazy"
      ></iframe>
      <div className="illustrations">
        <img src={focusIllustration} alt="Person organizing tasks" />
      </div>
    </div>
  );
};

export default Sidebar;
