import LogoAsset from "../assets/ziptassk-logo.png";
import ProfileIcon from "../assets/profile-icon.png";

const Navbar = () => {
  return (
    <div className="Navbar">
      <div className="LogoDiv">
        <img className="Logo" src={LogoAsset} alt="ziptassk" />
      </div>
      <div>
        <img className="Avatar" src={ProfileIcon} alt="ziptassk profile" />
      </div>
    </div>
  );
};

export default Navbar;
