import LogoAsset from "../assets/ziptassk-logo.png";

const Navbar = () => {
  return (
    <div className="Navbar">
      <div className="LogoDiv">
        <img className="Logo" src={LogoAsset} alt="ziptassk" />
      </div>
      <div>
        <span className="Avatar" aria-label="ziptassk profile">Z</span>
      </div>
    </div>
  );
};

export default Navbar;
