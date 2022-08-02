import React from "react";

// const TH_TD = {
//   // "border": "1px solid #dddddd",
//   "text-align": "left",
//   padding: "8px",
//   fontSize: 15,
//   backgroundColor: "#c9cdd0",
//   width: 200,
// };

export default class ComponentToPrint extends React.Component {
  render() {
    const { orderData } = this.props;
    const { company_info, user_info, orders_info, order_id } = orderData;
    console.log("000 000====================", orderData.company_info);
    return (
      <div
        style={{
          background: "#fff",
          padding: 50,
          width: "100%",
          margin: "auto",
          paddingTop: 100,
          height: "100vh",
        }}
        ref={this.props.ref}
      >
        <div
          style={{
            display: "flex",
            padding: 0,
            background: "#fff",
            marginTop: 0,
          }}
        >
          <div style={{ width: "80%" }}>
            <p style={{ fontSize: 15, marginBottom: 0, fontWeight: "bold" }}>
              BILL FROM:
            </p>
            <div style={{ fontSize: 15 }}>
              {company_info ? company_info.username : ""}
            </div>
            <div style={{ fontSize: 15 }}>
              {company_info ? company_info.companyDetails.companyName : ""}
            </div>
            <div style={{ fontSize: 15 }}>
              {company_info ? company_info.phone_number : ""}
            </div>
            <div style={{ fontSize: 15 }}>
              {company_info ? company_info.email : ""}
            </div>
          </div>
          <div style={{ width: "20%", textAlign: "right" }}>
            <img
              alt=""
              style={{ height: 50, width: 100 }}
              src={
                orderData.company_info
                  ? orderData.company_info.companyDetails.logo
                  : require("../../assets/logo.png")
              }
            />
          </div>
        </div>
        <hr />
        <div
          style={{
            display: "flex",
            padding: 0,
            margin: 0,
            background: "#fff",
            marginTop: 0,
          }}
          ref={this.props.ref}
        >
          <div style={{ width: "65%" }}>
            <p style={{ fontSize: 15, marginBottom: 0, fontWeight: "bold" }}>
              BILL To:
            </p>
            <div style={{ fontSize: 15 }}>
              {user_info ? user_info.customerName : ""}
            </div>
            <div style={{ fontSize: 15 }}>
              {" "}
              {user_info ? user_info.address : ""}
            </div>
            {/* <div style={{ fontSize: 15 }} >Karachi No KPK 144</div> */}
            <div style={{ fontSize: 15 }}>Pakistan</div>
            <div style={{ fontSize: 15 }}>
              {user_info ? user_info.phoneNumber : ""}
            </div>
          </div>
          <div style={{ width: "35%", textAlign: "right" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingLeft: 10,
                paddingRight: 10,
              }}
            >
              <div style={{ fontSize: 15, fontWeight: "bold" }}>Ivoice:</div>
              <div style={{ fontSize: 15 }}>{order_id}</div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingLeft: 10,
                paddingRight: 10,
              }}
            >
              <div style={{ fontSize: 15, fontWeight: "bold" }}>
                Ivoice Date:
              </div>
              <div style={{ fontSize: 15 }}>
                {new Date(Number(orderData.date)).toDateString()}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingLeft: 10,
                paddingRight: 10,
                backgroundColor: "#c9cdd0",
              }}
            >
              <div style={{ fontSize: 15, fontWeight: "bold" }}>DATA </div>
              <div style={{ fontSize: 15, fontWeight: "bold" }}>DATA </div>
            </div>
          </div>
        </div>
        <hr />
        <table style={{ width: "100%" }}>
          <tr>
            <th
              style={{
                fontSize: 15,
                width: "10%",
                backgroundColor: "#c9cdd0",
                padding: 5,
                paddingLeft: 30,
                textAlign: "center",
              }}
            >
              NAME
            </th>
            <th
              style={{
                fontSize: 15,
                width: "10%",
                backgroundColor: "#c9cdd0",
                padding: 5,
                paddingLeft: 30,
                textAlign: "center",
              }}
            >
              ORDER ID
            </th>
            {/* <th style={{ fontSize: 15, width: "50%", backgroundColor: "#c9cdd0", padding: 5 }} >Description</th> */}
            <th
              style={{
                fontSize: 15,
                width: "10%",
                backgroundColor: "#c9cdd0",
                padding: 5,
                textAlign: "center",
              }}
            >
              QUANTITY
            </th>
            <th
              style={{
                fontSize: 15,
                width: "10%",
                backgroundColor: "#c9cdd0",
                padding: 5,
                textAlign: "center",
              }}
            >
              TOTAL BILL
            </th>
            {/* <th style={{ fontSize: 15, width: "10%", backgroundColor: "#c9cdd0", padding: 5,  paddingRight: 30 }} >Line Total</th> */}
          </tr>
          {orders_info
            ? orders_info.map((v, i) => {
                return (
                  <tr>
                    <td
                      style={{
                        fontSize: 15,
                        width: "10%",
                        padding: 5,
                        paddingLeft: 30,
                        textAlign: "center",
                      }}
                    >
                      {v.productName}
                    </td>
                    <td
                      style={{
                        fontSize: 15,
                        width: "10%",
                        padding: 5,
                        paddingLeft: 30,
                        textAlign: "center",
                      }}
                    >
                      {v.productCode}
                    </td>
                    {/* <td style={{ fontSize: 15, width: "50%", padding: 5 }} >Specifies column properties for each column within a  element</td> */}
                    <td
                      style={{
                        fontSize: 15,
                        width: "10%",
                        padding: 5,
                        textAlign: "center",
                      }}
                    >
                      {v.quantity}
                    </td>
                    <td
                      style={{
                        fontSize: 15,
                        width: "10%",
                        padding: 5,
                        textAlign: "center",
                      }}
                    >
                      {v.total}
                    </td>
                    {/* <td style={{ fontSize: 15, width: "10%", padding: 5,  paddingRight: 30 }} >3000 PKR</td> */}
                  </tr>
                );
              })
            : null}
        </table>
        <hr />
        <div
          style={{
            display: "flex",
            padding: 0,
            margin: 0,
            background: "#fff",
            marginTop: 0,
          }}
          ref={this.props.ref}
        >
          <div style={{ width: "65%" }}>
            <div style={{ fontSize: 15, fontWeight: "bold" }}>NOTE/MEMO:</div>
            <div style={{ fontSize: 15 }}>
              properties for each column within a element
            </div>
          </div>
          <div style={{ width: "35%", textAlign: "right" }}>
            {/* <div style={{ display: 'flex', justifyContent: "space-between", paddingLeft: 10, paddingRight: 10 }} >
                            <div style={{ fontSize: 15, fontWeight: "bold" }} >SUBTOTAL</div>
                            <div style={{ fontSize: 15 }} >{orderData.total}</div>
                        </div> */}
            {/* <div style={{ display: 'flex', justifyContent: "space-between", paddingLeft: 10, paddingRight: 10 }} >
                            <div style={{ fontSize: 15, fontWeight: "bold" }} >TEX(13.0)</div>
                            <div style={{ fontSize: 15 }} >121 PKR</div>
                        </div> */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingLeft: 10,
                paddingRight: 10,
                backgroundColor: "#c9cdd0",
              }}
            >
              <div style={{ fontSize: 15, fontWeight: "bold" }}>SUBTOTAL</div>
              <div style={{ fontSize: 15, fontWeight: "bold" }}>
                {orderData.total}
              </div>
            </div>
          </div>
        </div>
        <hr />
      </div>
    );
  }
}
