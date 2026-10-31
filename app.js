let products = [
  { productCode: "PRD-001", productName: "Điện Thoại Nova X1", brand: "Nova Mobile", stockQuantity: 120, warrantyMonths: 12 },
  { productCode: "PRD-002", productName: "Máy Tính Bảng Nova Tab", brand: "Nova Mobile", stockQuantity: 35, warrantyMonths: 24 },
  { productCode: "PRD-003", productName: "Tai Nghe Sky Buds", brand: "Bluesky Audio", stockQuantity: 80, warrantyMonths: 6 }
];

const validateProductCode = (code) => {
  if (code === null) return "Hủy thao tác";
  if (typeof code !== "string" || code.trim() === "") {
    return "Lỗi: Mã sản phẩm không được để trống";
  }

  const cleanCode = code.trim().toUpperCase();

  if (!cleanCode.startsWith("PRD-")) {
    return 'Lỗi: Mã sản phẩm phải bắt đầu bằng "PRD-"';
  }

  // Kiểm tra trùng mã
  const index = findProductIndex(cleanCode);
  if (index !== -1) {
    return "Lỗi: Mã sản phẩm đã tồn tại";
  }

  return "";
};


const findProductIndex = (code) => {
  if (!code) return -1;
  const cleanCode = code.trim().toUpperCase();
  for (let i = 0; i < products.length; i++) {
    if (products[i].productCode.toUpperCase() === cleanCode) {
      return i;
    }
  }
  return -1;
};

const normalizeText = (rawText) => {
  if (!rawText) return "";
  const cleaned = rawText.trim().replace(/\s+/g, " ");
  if (cleaned === "") return "";

  const words = cleaned.split(" ");
  let result = "";
  for (let i = 0; i < words.length; i++) {
    const w = words[i];
    const capitalized = w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
    result += capitalized + (i === words.length - 1 ? "" : " ");
  }
  return result;
};

/**
 * 4. Nhập số nguyên trong khoảng [min, max], Cancel trả về null
 */
const inputIntegerInRange = (message, min, max) => {
  while (true) {
    const input = prompt(message);
    if (input === null) return null;

    const trimmed = input.trim();
    if (trimmed === "") {
      alert("Không được để trống. Vui lòng nhập lại!");
      continue;
    }

    const num = Number(trimmed);
    if (!isNaN(num) && Number.isInteger(num) && num >= min && num <= max) {
      return num;
    }

    alert(`Giá trị phải là số nguyên từ ${min} đến ${max}. Vui lòng nhập lại!`);
  }
};

/**
 * 5. In danh sách sản phẩm được truyền vào
 */
const displayProducts = (list) => {
  if (!list || list.length === 0) {
    console.log("Danh sách sản phẩm trống.");
    return;
  }

  console.log("==================================================");
  console.log("             DANH SÁCH SẢN PHẨM TECHZONE            ");
  console.log("==================================================");
  for (let i = 0; i < list.length; i++) {
    const p = list[i];
    console.log(
      `${i + 1}. [${p.productCode}] ${p.productName} - Hãng: ${p.brand}\n` +
      `   Tồn kho: ${p.stockQuantity} | Bảo hành: ${p.warrantyMonths} tháng`
    );
  }
  console.log(`Tổng số sản phẩm: ${list.length}`);
  console.log("==================================================");
};


// Case 1: Hiển thị danh sách
const handleDisplay = () => {
  displayProducts(products);
};

// Case 2: Thêm sản phẩm mới
const handleAdd = () => {
  const rawCode = prompt("Nhập mã sản phẩm (ví dụ: PRD-004):");
  if (rawCode === null) return;

  const error = validateProductCode(rawCode);
  if (error !== "") {
    console.log(error);
    alert(error);
    return;
  }
  const productCode = rawCode.trim().toUpperCase();

  const rawName = prompt("Nhập tên sản phẩm:");
  if (rawName === null) return;
  const productName = normalizeText(rawName);
  if (productName === "") {
    alert("Tên sản phẩm không hợp lệ.");
    return;
  }

  const rawBrand = prompt("Nhập hãng sản xuất:");
  if (rawBrand === null) return;
  const brand = normalizeText(rawBrand);
  if (brand === "") {
    alert("Hãng sản xuất không hợp lệ.");
    return;
  }

  const stockQuantity = inputIntegerInRange("Nhập số lượng tồn kho (từ 0 đến 10000):", 0, 10000);
  if (stockQuantity === null) return;

  const warrantyMonths = inputIntegerInRange("Nhập số tháng bảo hành (từ 0 đến 120):", 0, 120);
  if (warrantyMonths === null) return;

  const newProduct = {
    productCode: productCode,
    productName: productName,
    brand: brand,
    stockQuantity: stockQuantity,
    warrantyMonths: warrantyMonths
  };

  products.push(newProduct);
  console.log("Thêm sản phẩm thành công:", newProduct);
  alert("Thêm sản phẩm thành công!");
};

const startTechZoneApp = () => {
  let running = true;

  while (running) {
    const menu = 
      "=====================================================\n" +
      "      HỆ THỐNG QUẢN LÝ SẢN PHẨM CỬA HÀNG TECHZONE     \n" +
      "=====================================================\n" +
      "1. Hiển thị danh sách sản phẩm\n" +
      "2. Thêm sản phẩm mới\n" +
      "3. Cập nhật thông tin sản phẩm\n" +
      "4. Xóa sản phẩm\n" +
      "5. Tìm kiếm sản phẩm theo hãng sản xuất\n" +
      "0. Thoát chương trình\n" +
      "=====================================================\n" +
      "Vui lòng nhập lựa chọn của bạn (0 - 5):";

    const choice = prompt(menu);

    if (choice === null) {
      alert("Cảm ơn bạn đã sử dụng chương trình!");
      running = false;
      break;
    }

    switch (choice.trim()) {
      case "1":
        handleDisplay();
        break;
      case "2":
        handleAdd();
        break;
      case "3":
        handleUpdate();
        break;
      case "4":
        handleDelete();
        break;
      case "5":
        handleSearch();
        break;
      case "0":
        alert("Cảm ơn bạn đã sử dụng chương trình!");
        running = false;
        break;
      default:
        alert("Nhập sai, vui lòng chọn lại!");
        break;
    }
  }
};

// Khởi chạy chương trình
startTechZoneApp();