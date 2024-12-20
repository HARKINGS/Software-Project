let dataApartment = {
    totalResident: "N/A",
    totalHousehold: "N/A",
    permanentResident: "N/A",
    temporaryResident: "N/A",
};

async function fetchResidentData() {
    try {
        const response = await fetch("/admin/resident", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Không thể tải danh sách cư dân.");
        }

        let data = await response.json();
        const filteredData = data.filter((item) => item.temporary.toLowerCase().includes("tạm trú"));
        dataApartment.totalResident = data.length;
        dataApartment.temporaryResident = filteredData.length;
        const filteredData1 = data.filter((item) => item.temporary.toLowerCase().includes("thường trú"));
        dataApartment.permanentResident = filteredData1.length;
    } catch (error) {
        console.error("Lỗi khi tải danh sách cư dân:", error);
        alert("Không thể tải dữ liệu cư dân. Vui lòng thử lại sau.");
    }
}

async function fetchHouseholdData() {
    try {
        const response = await fetch("/admin/household", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Không thể tải danh sách hộ khẩu.");
        }

        let data1 = await response.json();
        dataApartment.totalHousehold = data1.length;
    } catch (error) {
        console.error("Lỗi khi tải danh sách hộ khẩu:", error);
        alert("Không thể tải dữ liệu hộ khẩu. Vui lòng thử lại sau.");
    }
}

async function loadDataAndFillInfo() {
    await Promise.all([fetchResidentData(), fetchHouseholdData()]);
    fillInfo();
}

function fillInfo() {
    document.getElementById("totalResident").innerHTML = dataApartment.totalResident;
    document.getElementById("totalHousehold").innerHTML = dataApartment.totalHousehold;
    document.getElementById("totalPermanent").innerHTML = dataApartment.permanentResident;
    document.getElementById("totalTemporary").innerHTML = dataApartment.temporaryResident;
}

document.addEventListener("DOMContentLoaded", loadDataAndFillInfo);
