// import React from "react";
// import Container from "react-bootstrap/Container";
// import { Link, Outlet } from "react-router-dom";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
// import user from "../../../multimedia/SVGs/USER.svg";
// import "./Layout.css";

// // import { useAuth } from "../../../features/auth";

// export const Layout = () => {
//   // const { isAuthenticated, isPending, isError } = useAuth();
//   return (
//     <div className="LAYOUT">
//       <header>
//         <Navbar
//           collapseOnSelect
//           expand="lg"
//           className="bg-body-tertiary navbar-header"
//         >
//           <Container>
//             <Navbar.Brand as={Link} to="/" id="LOGO-NAME">
//               PostPlate
//             </Navbar.Brand>
//             <Navbar.Toggle aria-controls="responsive-navbar-nav" />
//             <Navbar.Collapse id="responsive-navbar-nav">
//               <Nav className="me-auto">
//                 <Nav.Link href="#features">Muro</Nav.Link>
//                 <Nav.Link href="#pricing">Personas</Nav.Link>
//                 <NavDropdown title="Mi Perfil" id="collapsible-nav-dropdown">
//                   <NavDropdown.Item as={Link} to="/perfil">
//                     Editar Perfil
//                   </NavDropdown.Item>
//                   <NavDropdown.Item href="#action/3.2">
//                     Mis gustos
//                   </NavDropdown.Item>
//                   <NavDropdown.Item href="#action/3.3">Amigos</NavDropdown.Item>
//                   <NavDropdown.Divider />
//                   <NavDropdown.Item href="#action/3.4">
//                     Separated link
//                   </NavDropdown.Item>
//                 </NavDropdown>
//               </Nav>
//               <Nav>
//                 <Nav.Link as={Link} to="/registro">
//                   <img src={user} />
//                   Iniciar Sesión
//                 </Nav.Link>
//                 {/* {isPending
//         ? "Loading..."
//         : isError
//         ? "Error"
//         : isAuthenticated
//         ? "Authenticated"
//         : "Not Authenticated"} */}
//               </Nav>
//             </Navbar.Collapse>
//           </Container>
//         </Navbar>
//       </header>
//       <main>
//         <Outlet />
//       </main>
//     </div>
//   );
// };
