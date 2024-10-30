import { Card, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export function CustomTable({
  tableHead = [],
  tableRows = [],
  action,
  icon,
  link,
  customClass,
  SecondLink,
  SecondAction,
}) {
  return (
    <Card className="h-full w-full overflow-scroll scrollbar-hide font-poppins">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {tableHead.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-input p-4"
              >
                <Typography
                  variant="small"
                  color="sidebar"
                  className="font-medium leading-none opacity-70 "
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableRows.map((row, index) => (
            <tr key={index} className="even:bg-blue-gray-50/50">
            {Object.entries(row).map(([key, value], idx) =>
                key !== "customLinkState" ? ( // Exclude customLinkState from visible cells
                  <td key={idx} className="p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {value}
                    </Typography>
                  </td>
                ) : null
              )}
              <td className="p-4">
                <Typography
                  as="a"
                  href="#"
                  variant="small"
                  color="blue-gray"
                  className="font-medium"
                >
                  <Link
                    to={link}
                    state={row.customLinkState}
                    className="flex flex-row items-center gap-2"
                  >
                    {" "}
                    <span className="text-primary">{icon}</span>{" "}
                    <span className="font-body">{action}</span>
                  </Link>
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  as="a"
                  href="#"
                  variant="small"
                  color="blue-gray"
                  className="font-medium"
                >
                  <Link
                    to={SecondLink}
                    state={row.customLinkState}
                    className={`${customClass}`}
                  >
                    {" "}
                    <span className="font-body">{SecondAction}</span>
                  </Link>
                </Typography>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}

export function CustomTableTwo({
  tableHead = [],
  tableRows = [],
  action,
  icon,
  link,
  customClass,
  SecondLink,
  secondCustomState,
  SecondAction,
  customLinkState,
}) {
  console.log(customLinkState);
  return (
    <Card className="h-full w-full overflow-scroll scrollbar-hide font-poppins">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {tableHead.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-input p-4"
              >
                <Typography
                  variant="small"
                  color="sidebar"
                  className="font-medium leading-none opacity-70 "
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableRows.map((row, index) => (
            <tr key={index} className="even:bg-blue-gray-50/50">
              {/* Render only the values you want to display */}
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {index + 1 }
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {row.id }
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {row.institute }
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {row.country }
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {row.type === "offerLetter" ? "Offer Letter" : "" }
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className={`font-light text-[13px] text-white rounded-xl px-2  py-[3px] text-center ${
                    row.status === "underreview"
                      ? "bg-[#096D98] "
                      : row.status === "approved"
                      ? "bg-[#09985C]"
                      : row.status === "rejected"
                      ? "bg-[#D33131]"
                      : "bg-primary"
                  }`}
                >
                  {row.status === "underreview"
                    ? "Under Review"
                    : row.status === "rejected"
                    ? "Rejected"
                    : row.status === "approved"
                    ? "Approved"
                    : "NA"}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  as="a"
                  href="#"
                  variant="small"
                  color="blue-gray"
                  className="font-medium"
                >
                  <Link
                    to={link}
                    state={row.appId}
                    className="flex flex-row items-center gap-2"
                  >
                    <span className="text-primary">{icon}</span>
                    <span className="font-body">{action}</span>
                  </Link>
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  as="a"
                  href="#"
                  variant="small"
                  color="blue-gray"
                  className="font-medium"
                >
                  <Link
                    to={SecondLink}
                    state={secondCustomState}
                    className={customClass}
                  >
                    <span className="font-body">{SecondAction}</span>
                  </Link>
                </Typography>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
export function CustomTableThree({
  tableHead = [],
  tableRows = [],
  action,
  icon,
  link,
  customClass,
  SecondLink,
  secondCustomState,
  SecondAction,
  customLinkState,
}) {
  console.log(customLinkState);
  return (
    <Card className="h-full w-full overflow-scroll scrollbar-hide font-poppins">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {tableHead.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-input p-4"
              >
                <Typography
                  variant="small"
                  color="sidebar"
                  className="font-medium leading-none opacity-70 "
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableRows.map((row, index) => (
            <tr key={index} className="even:bg-blue-gray-50/50">
              {/* Render only the values you want to display */}
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {index + 1 || "NA"}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {row.id }
                </Typography>
              </td>
          
   
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {row.type === "offerLetter" ? "Offer Letter" : "" }
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className={`font-light text-[13px] text-white rounded-xl px-2 w-28 py-[3px] text-center ${
                    row.status === "underreview"
                      ? "bg-[#096D98] "
                      : row.status === "approved"
                      ? "bg-[#09985C]"
                      : row.status === "rejected"
                      ? "bg-[#D33131]"
                      : "bg-primary"
                  }`}
                >
                  {row.status === "underreview"
                    ? "Under Review"
                    : row.status === "rejected"
                    ? "Rejected"
                    : row.status === "approved"
                    ? "Approved"
                    : "NA"}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  as="a"
                  href="#"
                  variant="small"
                  color="blue-gray"
                  className="font-medium"
                >
                  <Link
                    to={link}
                    state={row.appId}
                    className="flex flex-row items-center gap-2"
                  >
                    <span className="text-primary">{icon}</span>
                    <span className="font-body">{action}</span>
                  </Link>
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  as="a"
                  href="#"
                  variant="small"
                  color="blue-gray"
                  className="font-medium"
                >
                  <Link
                    to={SecondLink}
                    state={secondCustomState}
                    className={customClass}
                  >
                    <span className="font-body">{SecondAction}</span>
                  </Link>
                </Typography>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
