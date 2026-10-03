import LogoAsset from "../assets/Logo.png";

const Navbar = () => {
  return (
    <div className="Navbar">
      <div className="LogoDiv">
        <span className="LogoMark" aria-hidden="true"><img src={LogoAsset} alt="" /></span>
        <span className="Logo">ziptassk</span>
      </div>
      <div>
        <span className="Avatar" aria-label="ziptassk profile">Z</span>
      </div>
    </div>
  );
};

export default Navbar;
