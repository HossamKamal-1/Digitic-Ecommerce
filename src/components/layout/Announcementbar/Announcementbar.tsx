import { LANGUAGES_LIST } from "@data/constants";
import "./Announcementbar.scss";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { DropdownMenu } from "@components/common/ui";
function Announcementbar() {
  const [openLangList, setOpenLangList] = useState(false);
  const [openCurrencyList, setOpenCurrencyList] = useState(false);
  return (
    <div className="announcement">
      <div className="container">
        <div className="announcement-wrapper">
          <div className="left">
            <p className="announcement-text">
              Free Shipping Over $100 & Free Returns
            </p>
          </div>
          <div className="right">
            <div className="hotline">6000-(888) 1338 8193</div>
            <div className="divider" />
            <div className="locales">
              <div className="languages dropdown">
                <div
                  className={`dropdown-btn ${openLangList ? "active" : ""}`}
                  onClick={() => setOpenLangList((p) => !p)}
                >
                  English <ChevronDown className="icon" />
                </div>
                <DropdownMenu open={openLangList}>
                  {LANGUAGES_LIST.map((lang) => (
                    <li className="lang" key={lang}>
                      {lang}
                    </li>
                  ))}
                </DropdownMenu>
              </div>
              <div className="currencies dropdown">
                <div
                  className={`dropdown-btn ${openCurrencyList ? "active" : ""}`}
                  onClick={() => setOpenCurrencyList((p) => !p)}
                >
                  USD $ <ChevronDown className="icon" />
                </div>
                <DropdownMenu open={openCurrencyList}>
                  <li className="currency">SR</li>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Announcementbar;
