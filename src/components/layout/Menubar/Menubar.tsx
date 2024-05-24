import "./Menubar.scss";
import { ChevronDown, ChevronRight, Menu } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import Searchbar from "../Searchbar/Searchbar";
import { DropdownMenu } from "@components/common/ui";

// TODO: replace all links with navlinks
function Menubar() {
  const [toggleShopCategoryDropDownMenu, setToggleShopCategoryDropDownMenu] =
    useState(false);
  return (
    <nav className="menubar">
      <div className="container">
        <div className="menubar-content">
          <div className="searchbar">
            <Searchbar />
          </div>
          <ul className="menubar-menu">
            <li className="dropdown">
              <button
                className={`shopcat-btn ${
                  toggleShopCategoryDropDownMenu ? "active" : ""
                }`}
                onClick={() => setToggleShopCategoryDropDownMenu((p) => !p)}
              >
                <Menu />
                <div>
                  <span>SHOP CATEGORIES</span>
                  <ChevronDown className="icon" />
                </div>
              </button>
              <DropdownMenu
                className="shopcategory-dropdown-menu"
                open={toggleShopCategoryDropDownMenu}
              >
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `dropdown-nav-link ${isActive ? "active" : ""}`
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li className="dropdown">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `dropdown-btn dropdown-nav-link ${
                        isActive ? "active" : ""
                      }`
                    }
                  >
                    Cameras & Videos
                    <ChevronRight className="icon" />
                  </NavLink>
                  <DropdownMenu className="cameras-dropdown-menu">
                    <li className="dropdown-col">
                      <Link to="/" className="dropdown-nav-link">
                        Airpods
                      </Link>
                      <ul>
                        <li>
                          <Link className="dropdown-nav-link" to="/">
                            Cameras & Videos
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-nav-link" to="/">
                            Cameras & Videos
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-nav-link" to="/">
                            Camera's
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-nav-link" to="/">
                            Headphones
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-nav-link" to="/">
                            Ipads
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li className="dropdown-col">
                      <Link to="/" className="dropdown-nav-link">
                        Airpods
                      </Link>
                      <ul>
                        <li>
                          <Link className="dropdown-nav-link" to="/">
                            Cameras & Videos
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-nav-link" to="/">
                            Cameras & Videos
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-nav-link" to="/">
                            Camera's
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-nav-link" to="/">
                            Headphones
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-nav-link" to="/">
                            Ipads
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li className="dropdown-col">
                      <Link to="/" className="dropdown-nav-link">
                        Airpods
                      </Link>
                      <ul>
                        <li>
                          <Link className="dropdown-nav-link" to="/">
                            Cameras & Videos
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-nav-link" to="/">
                            Cameras & Videos
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-nav-link" to="/">
                            Camera's
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-nav-link" to="/">
                            Headphones
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-nav-link" to="/">
                            Ipads
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li className="dropdown-col">
                      <Link to="/" className="dropdown-nav-link">
                        Airpods
                      </Link>
                      <ul>
                        <li>
                          <Link className="dropdown-nav-link" to="/">
                            Cameras & Videos
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-nav-link" to="/">
                            Cameras & Videos
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-nav-link" to="/">
                            Camera's
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-nav-link" to="/">
                            Headphones
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-nav-link" to="/">
                            Ipads
                          </Link>
                        </li>
                      </ul>
                    </li>
                  </DropdownMenu>
                </li>
                <li className="dropdown">
                  <Link to="/" className="dropdown-btn dropdown-nav-link">
                    Computers & Laptops
                    <ChevronRight className="icon" />
                  </Link>
                  <DropdownMenu>
                    <li>
                      <Link className="dropdown-nav-link" to="/">
                        dddd
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-nav-link" to="/">
                        dddd
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-nav-link" to="/">
                        dddd
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-nav-link" to="/">
                        dddd
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-nav-link" to="/">
                        dddd
                      </Link>
                    </li>
                  </DropdownMenu>
                </li>
                <li className="dropdown">
                  <Link to="/" className="dropdown-btn dropdown-nav-link">
                    Home Appliancees
                    <ChevronRight className="icon" />
                  </Link>
                  <DropdownMenu>
                    <li>
                      <Link className="dropdown-nav-link" to="/">
                        dddd
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-nav-link" to="/">
                        dddd
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-nav-link" to="/">
                        dddd
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-nav-link" to="/">
                        dddd
                      </Link>
                    </li>
                  </DropdownMenu>
                </li>
                <li>
                  <Link to="/" className="dropdown-nav-link">
                    Handbag
                  </Link>
                </li>
                <li>
                  <Link to="/" className="dropdown-nav-link">
                    Mobiles & Tablets
                  </Link>
                </li>
                <li>
                  <Link to="/" className="dropdown-nav-link">
                    Smart Phones
                  </Link>
                </li>
                <li>
                  <Link to="/" className="dropdown-nav-link">
                    Portable Speakers
                  </Link>
                </li>
                <li>
                  <Link to="/" className="dropdown-nav-link">
                    Music & Gaming Speakers
                  </Link>
                </li>
              </DropdownMenu>
            </li>
            <li className="dropdown">
              <Link to="/" className="nav-link home-link">
                HOME
                <ChevronDown className="icon" />
              </Link>
              <DropdownMenu
                className="home-dropdown-menu"
                menuItems={[
                  { title: "All Collections", url: "/store" },
                  { title: "Cameras", url: "/store/cameras" },
                  {
                    title: "Airpods",
                    url: "/store/airpods",
                  },
                  {
                    title: "Homepage",
                    url: "/",
                  },
                  {
                    title: "Airpods",
                    url: "/store/airpods",
                  },
                ]}
              />
            </li>
            <li>
              <Link to="/store" className="nav-link">
                OUR STORE
              </Link>
            </li>
            <li>
              <Link to="/blogs" className="nav-link">
                BLOGS
              </Link>
            </li>
            <li>
              <Link to="/contact" className="nav-link">
                CONTACT
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Menubar;
