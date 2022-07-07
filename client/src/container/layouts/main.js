import React from "react";

export default function Main({ children }) {
  return (
    <div className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1>Quản lý công việc</h1>
          <h4>Thêm những công việc bạn cần làm</h4>
          {children}
        </div>
      </div>
    </div>
  );
}
