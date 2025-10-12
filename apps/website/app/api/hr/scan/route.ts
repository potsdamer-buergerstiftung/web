import { NextRequest, NextResponse } from "next/server";

import { FrappeApp } from "frappe-js-sdk";

const frappe = new FrappeApp("https://desk.potsdamer-buergerstiftung.org", {
  useToken: true,
  token: () => "ec5b2e1b70258b5:8494e1f12ea0bda",
  type: "token",
});

export async function POST(request: Request) {
  const json = await request.json();

  if (!json.qr) {
    return NextResponse.error();
  }

  const qr = json.qr;

  console.log("QRR::::", qr);

  const timestamp = new Date().toISOString().slice(0, 19).replace("T", " ");
  const employees = await frappe.db().getDocList("Employee", {
    fields: ["name", "employee_name"],
    filters: [["attendance_device_id", "=", qr]],
  });

  if (!(employees.length > 0)) {
    return NextResponse.error();
  }

  const employee = employees[0];

  const logs = await frappe.db().getDocList("Employee Checkin", {
    fields: ["log_type", "time"],
    filters: [["employee", "=", employee.name]],
    orderBy: { field: "time", order: "desc" },
    limit: 1,
  });

  let logType = "OUT";
  let time = timestamp;

  if (logs.length > 0) {
    const log = logs[0];

    if (log.log_type !== "IN") {
      logType = "IN";
    }
  } else {
    logType = "IN";
  }

  const call = await frappe
    .call()
    .post(
      "hrms.hr.doctype.employee_checkin.employee_checkin.add_log_based_on_employee_field",
      {
        employee_field_value: qr,
        timestamp: time,
        device_id: "1",
        log_type: logType,
      }
    );

  console.log(call);

  return NextResponse.json({
    employee: employee.employee_name,
    log_type: logType,
  });
}
