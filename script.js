// ==========================================
// 1. Mobile Navigation Toggle & Auto-Close
// ==========================================
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileMenu = document.getElementById("mobileMenu");

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });

  const mobileLinks = mobileMenu.querySelectorAll("a");
  mobileLinks.forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
    });
  });
}

// ==========================================
// 2. Laptop Data Generation (250+ Items)
// ==========================================
const generateLaptops = () => {
  const laptops = [];
  const brands = ["Lenovo", "Asus", "Dell", "HP", "Acer", "MSI", "Razer"];
  const categories = ["cs", "gaming", "casual"];
  const storageOptions = ["256GB SSD", "512GB SSD", "1TB SSD", "2TB SSD"];
  const ramOptions = ["8GB", "16GB", "32GB"];
  const gpuOptions = ["Integrated", "4GB Dedicated", "6GB Dedicated", "8GB Dedicated"];

  laptops.push({
    id: 0,
    brand: "Custom",
    model: "DevPro Alpha",
    useCase: "cs",
    price: 1850,
    ram: "16GB",
    storage: "1TB SSD",
    gpu: "6GB Dedicated"
  });

  for (let i = 1; i <= 254; i++) {
    const useCase = categories[i % 3];
    let price = 0;
    let ram = "";
    let gpu = "";
    let storage = storageOptions[i % 4];

    if (useCase === "casual") {
      price = 500 + ((i * 2) % 700);
      ram = "8GB";
      gpu = "Integrated";
    } else if (useCase === "cs") {
      price = 1000 + ((i * 3) % 1200);
      ram = ramOptions[(i % 2) + 1];
      gpu = i % 2 === 0 ? "Integrated" : "4GB Dedicated";
    } else {
      price = 1500 + ((i * 5) % 2000);
      ram = ramOptions[(i % 2) + 1];
      gpu = gpuOptions[(i % 2) + 2];
    }

    laptops.push({
      id: i,
      brand: brands[i % brands.length],
      model: `Series ${String.fromCharCode(65 + (i % 26))}-${1000 + i}`,
      useCase: useCase,
      price: price,
      ram: ram,
      storage: storage,
      gpu: gpu
    });
  }
  return laptops;
};

const laptopData = generateLaptops();

// ==========================================
// 3. Brand-Specific Windows / PC Image Mapping
// ==========================================
const getLaptopImage = (brand) => {
  const images = {
    "Lenovo": "https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80",
    "Asus": "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&auto=format&fit=crop&q=80",
    "Dell": "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=600&auto=format&fit=crop&q=80",
    "HP": "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&auto=format&fit=crop&q=80",
    "Acer": "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600&auto=format&fit=crop&q=80",
    "MSI": "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&auto=format&fit=crop&q=80",
    "Razer": "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&auto=format&fit=crop&q=80",
    "Custom": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80"
  };
  return images[brand] || images["Custom"];
};

// ==========================================
// 4. Populate & Filter Catalog Page
// ==========================================
const catalogContainer = document.getElementById("catalogContainer");
const filterBrand = document.getElementById("filterBrand");
const filterUseCase = document.getElementById("filterUseCase");
const filterRam = document.getElementById("filterRam");
const filterStorage = document.getElementById("filterStorage");
const filterGpu = document.getElementById("filterGpu");
const resetFiltersBtn = document.getElementById("resetFiltersBtn");

const renderCatalogGrid = (data) => {
  if (!catalogContainer) return;
  catalogContainer.innerHTML = "";

  if (data.length === 0) {
    catalogContainer.innerHTML = `
      <div class="col-span-full py-12 text-center bg-white rounded-3xl border border-gray-200">
        <p class="text-lg font-semibold text-[#333333]">No laptops match your filter criteria.</p>
        <p class="text-sm text-[#777777] mt-1">Try adjusting your filters or resetting them.</p>
      </div>
    `;
    return;
  }

  data.forEach(laptop => {
    const card = document.createElement("div");
    card.className = "bg-white p-5 rounded-3xl border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between";
    card.innerHTML = `
      <div>
        <div class="w-full h-44 bg-gray-50 rounded-2xl mb-4 overflow-hidden border border-gray-100 relative">
          <img src="${getLaptopImage(laptop.brand)}" alt="${laptop.brand} ${laptop.model}" class="w-full h-full object-cover hover:scale-105 transition-transform duration-300">
          <span class="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-xs font-bold px-2.5 py-1 rounded-lg text-[#333333] shadow-xs">${laptop.brand}</span>
        </div>
        <h3 class="font-bold text-lg text-[#333333]">${laptop.brand} ${laptop.model}</h3>
        <p class="text-[#86CFFF] font-extrabold text-xl mt-1 mb-3">S$${laptop.price}</p>
        <ul class="text-xs text-[#777777] space-y-1.5 border-t border-gray-100 pt-3">
          <li><strong>Use:</strong> <span class="uppercase">${laptop.useCase}</span></li>
          <li><strong>RAM:</strong> ${laptop.ram} | <strong>Storage:</strong> ${laptop.storage}</li>
          <li><strong>GPU:</strong> ${laptop.gpu}</li>
        </ul>
      </div>
    `;
    catalogContainer.appendChild(card);
  });
};

const applyFilters = () => {
  if (!catalogContainer) return;

  const brandVal = filterBrand ? filterBrand.value : "all";
  const useCaseVal = filterUseCase ? filterUseCase.value : "all";
  const ramVal = filterRam ? filterRam.value : "all";
  const storageVal = filterStorage ? filterStorage.value : "all";
  const gpuVal = filterGpu ? filterGpu.value : "all";

  const filtered = laptopData.filter(laptop => {
    if (brandVal !== "all" && laptop.brand !== brandVal) return false;
    if (useCaseVal !== "all" && laptop.useCase !== useCaseVal) return false;
    if (ramVal !== "all" && laptop.ram !== ramVal) return false;
    if (storageVal !== "all" && laptop.storage !== storageVal) return false;
    if (gpuVal !== "all" && laptop.gpu !== gpuVal) return false;
    return true;
  });

  renderCatalogGrid(filtered);
};

if (catalogContainer) {
  renderCatalogGrid(laptopData);

  [filterBrand, filterUseCase, filterRam, filterStorage, filterGpu].forEach(filterEl => {
    if (filterEl) {
      filterEl.addEventListener("change", applyFilters);
    }
  });

  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener("click", () => {
      if (filterBrand) filterBrand.value = "all";
      if (filterUseCase) filterUseCase.value = "all";
      if (filterRam) filterRam.value = "all";
      if (filterStorage) filterStorage.value = "all";
      if (filterGpu) filterGpu.value = "all";
      renderCatalogGrid(laptopData);
    });
  }
}

// ==========================================
// 5. Matchmaker DOM Manipulation
// ==========================================
const matchForm = document.getElementById("matchForm");
const resultContainer = document.getElementById("resultContainer");

if (matchForm) {
  matchForm.addEventListener("submit", (event) => {
    event.preventDefault(); 
    
    const budget = parseFloat(document.getElementById("budgetInput").value);
    const useCase = document.getElementById("useCase").value;

    if (!budget || budget < 1) {
      resultContainer.innerHTML = `<p class="text-red-500 font-semibold">Please enter a valid budget.</p>`;
      return;
    }

    const matches = laptopData.filter(laptop => laptop.useCase === useCase && laptop.price <= budget);
    matches.sort((a, b) => b.price - a.price);
    
    resultContainer.innerHTML = ""; 

    if (matches.length === 0) {
      resultContainer.innerHTML = `
        <div class="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm text-center">
          <p class="text-[#333333] font-semibold text-lg">No matches found.</p>
          <p class="text-[#777777] mt-2">Try increasing your budget or changing the use case.</p>
        </div>
      `;
      return;
    }

    const header = document.createElement("h2");
    header.className = "text-xl font-bold mb-4";
    header.innerText = `Found ${matches.length} matching laptops:`;
    resultContainer.appendChild(header);

    const grid = document.createElement("div");
    grid.className = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-h-[800px] overflow-y-auto p-2";

    matches.forEach(laptop => {
      const card = document.createElement("div");
      card.className = "bg-white p-5 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow";
      card.innerHTML = `
        <div class="w-full h-32 bg-gray-50 rounded-xl mb-3 overflow-hidden border border-gray-100">
          <img src="${getLaptopImage(laptop.brand)}" alt="${laptop.brand}" class="w-full h-full object-cover">
        </div>
        <h3 class="font-extrabold text-lg text-[#86CFFF]">${laptop.brand} ${laptop.model}</h3>
        <p class="text-2xl font-bold text-[#333333] mt-1 mb-3">S$${laptop.price}</p>
        <ul class="text-xs text-[#777777] space-y-1.5">
          <li><strong>RAM:</strong> ${laptop.ram}</li>
          <li><strong>Storage:</strong> ${laptop.storage}</li>
          <li><strong>Graphics:</strong> ${laptop.gpu}</li>
        </ul>
      `;
      grid.appendChild(card);
    });

    resultContainer.appendChild(grid);
  });
}

// ==========================================
// 6. Interactive Reviews System
// ==========================================
const reviewForm = document.getElementById("reviewForm");
const reviewsGrid = document.getElementById("reviewsGrid");

const defaultReviews = [
  { name: "Alex J.", rating: 5, text: "Saved me hours of searching. Found the exact specs I needed for video rendering within my budget." },
  { name: "Sarah W.", rating: 4, text: "The Matchmaker is incredibly responsive. Would love to see more filter options in the future." }
];

const getStoredReviews = () => {
  const stored = localStorage.getItem("techmatch_reviews");
  if (stored) {
    try { return JSON.parse(stored); } catch (e) { return defaultReviews; }
  }
  return defaultReviews;
};

const renderReviews = () => {
  if (!reviewsGrid) return;
  const reviews = getStoredReviews();
  reviewsGrid.innerHTML = "";
  
  reviews.forEach(rev => {
    const card = document.createElement("div");
    card.className = "bg-white p-6 rounded-3xl border border-gray-200 shadow-sm";
    const stars = "★".repeat(rev.rating) + "☆".repeat(5 - rev.rating);
    card.innerHTML = `
      <div class="flex text-[#86CFFF] mb-3">${stars}</div>
      <p class="text-[#777777] italic">"${rev.text}"</p>
      <p class="font-bold mt-4">- ${rev.name}</p>
    `;
    reviewsGrid.appendChild(card);
  });
};

if (reviewForm) {
  reviewForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("reviewerName").value.trim();
    const rating = parseInt(document.getElementById("reviewerRating").value);
    const text = document.getElementById("reviewerText").value.trim();

    if (!name || !text) return;

    const reviews = getStoredReviews();
    reviews.unshift({ name, rating, text });
    localStorage.setItem("techmatch_reviews", JSON.stringify(reviews));

    renderReviews();
    reviewForm.reset();
  });
}

renderReviews();