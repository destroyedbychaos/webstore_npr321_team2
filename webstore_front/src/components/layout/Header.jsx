import "./layout.css";
import { Link, useNavigate } from "react-router-dom";
import { memo } from "react";
import { Badge } from "@mui/material";
import { ShoppingCart, Favorite } from "@mui/icons-material";
import noImgUser from "../../assets/images/noImgUser.png";

const adminPages = [
  { title: "Categories", path: "/categories" },
  { title: "Manufacturers", path: "/manufacturers" },
  { title: "Users", path: "/users" },
  { title: "Products", path: "/productList" },
];

const Header = memo(() => {
  return (
    <>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container">
          <a class="navbar-brand" href="#">
            Web Store
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" class="nav-link active">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/Products" class="nav-link">
                  Products
                </Link>
              </li>
            </ul>

            <div className="d-flex align-items-center">
              <Link to="/favoriteProducts" className="text-reset me-3">
                <Badge color="error">
                  <Favorite />
                </Badge>
              </Link>

              <Link to="/cartItems" className="text-reset me-3">
                <Badge color="error">
                  <ShoppingCart />
                </Badge>
              </Link>

              <a className="text-reset me-2" href="#">
                <i className="fas fa-bell"></i>
              </a>

              {true && (
                <div className="dropdown mx-2">
                  <a
                    className="text-reset dropdown-toggle hidden-arrow"
                    href="#"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span className="badge rounded-pill badge-notification bg-danger">
                      Admin
                    </span>
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    {adminPages.map((page) => (
                      <li key={page.path}>
                        <Link className="dropdown-item" to={page.path}>
                          {page.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {false ? (
                <div className="dropdown">
                  <a
                    className="dropdown-toggle d-flex align-items-center hidden-arrow"
                    href="#"
                    id="navbarDropdownMenuAvatar"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      // src={userImage(currentUser?.image)} пофіксить
                      src={noImgUser}
                      className="rounded-circle"
                      height="25"
                      width="25"
                      alt="User Avatar"
                      loading="lazy"
                    />
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="navbarDropdownMenuAvatar"
                  >
                    {true && (
                      <li>
                        <Link className="dropdown-item" to="/profile">
                          My Profile
                        </Link>
                      </li>
                    )}

                    <li>
                      <Link className="dropdown-item" to="/settings">
                        Settings
                      </Link>
                    </li>
                    <li>
                      <button className="dropdown-item">Logout</button>
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="d-flex gap-3">
                  <Link to="/login" className="btn btn-outline-primary">
                    Login
                  </Link>
                  <Link to="/register" className="btn btn-primary text-white">
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
});

export default Header;
