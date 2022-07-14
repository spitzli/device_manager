export default function table(table: any) {
  $("#addRow").on("click", function () {
    table.row.add([]).draw(false);
  });
}
