import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const List = () => {
  const rows = [
    {
      id: 1143155,
      product: "Single Bed Room",
      img: "https://assets.architecturaldigest.in/photos/621f43c6fa7af6911e95b64a/16:9/w_1615,h_908,c_limit/7%20budget-friendly%20kids%E2%80%99%20room%20design%20ideas.jpg",
      customer: "John Smith",
      date: "1 March",
      amount: 785,
      method: "Cash on Delivery",
      status: "Approved",
    },
    {
      id: 2235235,
      product: "Double Bed Room",
      img: "https://www.bhg.com/thmb/oXUlhDXyrvHr5bsWGt85TY0Uh8I=/400x0/filters:no_upscale():max_bytes(150000):strip_icc()/master-bedroom-tufted-headboard-bed-720859ec-4916e08c7a5840cbbb94d2d993929207.jpg",
      customer: "Michael Doe",
      date: "1 March",
      amount: 900,
      method: "Online Payment",
      status: "Pending",
    },
    {
      id: 2342353,
      product: "King Size Room",
      img: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/family-room-ideas-hbx0613000a-1611614336.jpg",
      customer: "John Smith",
      date: "1 March",
      amount: 35,
      method: "Cash on Delivery",
      status: "Pending",
    },
    {
      id: 2357741,
      product: "Queen Size Room",
      img: "https://s7d2.scene7.com/is/image/ritzcarlton/pnrqz-king-50661983?$XlargeViewport100pct$",
      customer: "Jane Smith",
      date: "1 March",
      amount: 920,
      method: "Online",
      status: "Approved",
    },
    {
      id: 2342355,
      product: "Family Size Room",
      img: "https://s7d2.scene7.com/is/image/ritzcarlton/RCMSSHL_00015?$XlargeViewport100pct$",
      customer: "Harold Carol",
      date: "1 March",
      amount: 2000,
      method: "Online",
      status: "Pending",
    },
  ];
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">USER ID</TableCell>
            <TableCell className="tableCell">ROOM TYPE</TableCell>
            <TableCell className="tableCell">Customer Name</TableCell>
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">Amount</TableCell>
            <TableCell className="tableCell">Payment Method</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.id}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={row.img} alt="" className="image" />
                  {row.product}
                </div>
              </TableCell>
              <TableCell className="tableCell">{row.customer}</TableCell>
              <TableCell className="tableCell">{row.date}</TableCell>
              <TableCell className="tableCell">{row.amount}</TableCell>
              <TableCell className="tableCell">{row.method}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
