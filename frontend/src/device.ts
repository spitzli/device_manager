$(document).ready(async function () {
  //@ts-ignore
  const device = $("#device").DataTable({
    ajax: "/api/device",
    columns: [
      { data: "id" },
      { data: "name" },
      { data: "vorname" },
      { data: "username" },
      { data: "password" },
      { data: "computername" },
      { data: "workgroup" },
      { data: "system" },
      { data: "ip_adress" },
      { data: "mac_adress" },
      { data: "datum" },
      { data: "license_id" },
      { data: "amount" },
    ],
  });

  const form = $("form#deviceForm");

  form.on("submit", async (event) => {
    event.preventDefault();

    const id = $("input#id").val().toString();
    const name = $("input#name").val().toString();
    const vorname = $("input#vorname").val().toString();
    const username = $("input#username").val().toString();
    const password = $("input#password").val().toString();
    const computername = $("input#computername").val().toString();
    const workgroup = $("input#workgroup").val().toString();
    const system = $("input#system").val().toString();
    const ip_adress = $("input#ip_adress").val().toString();
    const mac_adress = $("input#mac_adress").val().toString();
    const datum = $("input#datum").val().toString();
    const license_id = $("input#license_id").val().toString();
    const amount = $("input#amount").val().toString();

    await fetch("/api/device", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        name: name,
        vorname: vorname,
        username: username,
        password: password,
        computername: computername,
        workgroup: workgroup,
        system: system,
        ip_adress: ip_adress,
        mac_adress: mac_adress,
        datum: datum,
        license_id: license_id,
        amount: amount,
      }),
    }).then((res) => res.json());

    location.reload();
  });

  $("#device tbody").on("click", "tr", function () {
    $(this).toggleClass("selected");

    const row = device.row(".selected").data();

    if ($(this).hasClass("selected")) {
      $("input#id").val(row.id);
      $("input#name").val(row.name);
      $("input#vorname").val(row.vorname);
      $("input#username").val(row.username);
      $("input#password").val(row.password);
      $("input#computername").val(row.computername);
      $("input#workgroup").val(row.workgroup);
      $("input#system").val(row.system);
      $("input#ip_adress").val(row.ip_adress);
      $("input#mac_adress").val(row.mac_adress);
      $("input#datum").val(row.datum);
      $("input#license_id").val(row.license_id);
      $("input#amount").val(row.amount);
    } else {
      //@ts-ignore
      form[0].reset();
    }
  });

  $("#deviceUnselect").on("click", function () {
    device.$("tr.selected").removeClass("selected");
    //@ts-ignore
    form[0].reset();
  });

  $("#deviceDelete").click(async function () {
    const rows = device.rows(".selected").data();

    for (const row of rows) {
      await fetch("/api/device", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: row.id,
        }),
      }).then((res) => res.json());
    }
    location.reload();
  });
});
