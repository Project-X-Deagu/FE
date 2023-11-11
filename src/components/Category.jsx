// Category.jsx
import React, { useState } from "react";
import styled from "styled-components";

// const Nav = styled.nav`
//   /* 네비게이션 컨테이너에 대한 스타일 추가 */
// `;

// const NavContainer = styled.ul`
//   /* 메인 네비게이션 컨테이너에 대한 스타일 추가 */
//   list-style-type: none;
//   padding: 0;
//   display: flex;
// `;

// const MenuItem = styled.li`
//   /* 각 메뉴 항목에 대한 스타일 추가 */
//   margin-right: 20px;
//   position: relative;
// `;

// const DetailMenu = styled.div`
//   /* 상세 메뉴에 대한 스타일 추가 */
//   display: ${(props) => (props.isVisible ? "block" : "none")};
//   position: absolute;
//   top: 100%;
//   left: 0;
//   background-color: #fff;
//   border: 1px solid #ccc;
//   padding: 10px;
// `;

// const SubMenuItem = styled.li`
//   /* 세부 메뉴 항목에 대한 스타일 추가 */
//   list-style-type: none;
//   margin-bottom: 5px;
// `;

// const ColumnWrapper = styled.div`
//   display: flex;
//   justify-content: space-between;
// `;

// export const Category = ({ isVisible }) => {
//   const [isDropdownVisible, setDropdownVisible] = useState(false);

//   const handleCategoryHover = (hovered) => {
//     setDropdownVisible(hovered);
//   };

//   const handleLogoClick = () => {
//     window.location.reload(); // 새로고침
//   };

//   return (
//     <Nav>
//       <NavContainer>
//         <MenuItem
//           onMouseEnter={() => handleCategoryHover(true)}
//           onMouseLeave={() => handleCategoryHover(false)}
//         >
//           <DetailMenu
//             isVisible={isVisible || isDropdownVisible}
//             className="detailMenu"
//           >
//             <ColumnWrapper>
//               <div>
//                 <ul>
//                   <SubMenuItem>한글</SubMenuItem>
//                 </ul>
//               </div>
//               <div>
//                 <ul>
//                   <SubMenuItem>English</SubMenuItem>
//                 </ul>
//                 {isDropdownVisible && (
//                   <ul>
//                     <ColumnWrapper>
//                       <div>
//                         <SubMenuItem>Java</SubMenuItem>
//                       </div>
//                       <div>
//                         <SubMenuItem>Python</SubMenuItem>
//                       </div>
//                       <div>
//                         <SubMenuItem>C</SubMenuItem>
//                       </div>
//                     </ColumnWrapper>
//                   </ul>
//                 )}
//               </div>
//             </ColumnWrapper>
//           </DetailMenu>
//         </MenuItem>
//       </NavContainer>
//     </Nav>
//   );
// };
