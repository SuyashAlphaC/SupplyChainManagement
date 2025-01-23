// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Truck,
  Package,
  CheckCircle,
  AlertCircle,
  ArrowRightCircle,
  Building2,
  Users,
  History,
} from "lucide-react";

// Product status mapping for better readability
const ProductStatus = {
  Created: 0,
  ShippedByMfg: 1,
  ReceivedByDist: 2,
  ShippedByDist: 3,
  ReceivedByRet: 4,
  Sold: 5,
};

const Navigation = ({ activeTab, setActiveTab }) => (
  <div className="bg-white shadow-sm border-b">
    <div className="max-w-7xl mx-auto">
      <div className="flex space-x-8">
        {[
          { id: "dashboard", label: "Dashboard", icon: Package },
          { id: "products", label: "Products", icon: Truck },
          { id: "participants", label: "Participants", icon: Users },
          { id: "quality", label: "Quality Control", icon: CheckCircle },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`px-4 py-4 flex items-center space-x-2 border-b-2 ${
              activeTab === id
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500"
            }`}
          >
            <Icon className="h-5 w-5" />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </div>
  </div>
);

const Stats = ({ stats }) => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
    {[
      {
        label: "Total Products",
        value: stats.totalProducts,
        icon: Package,
        color: "blue",
      },
      {
        label: "In Transit",
        value: stats.inTransit,
        icon: Truck,
        color: "green",
      },
      {
        label: "Quality Passed",
        value: stats.qualityPassed,
        icon: CheckCircle,
        color: "emerald",
      },
      {
        label: "Quality Issues",
        value: stats.qualityIssues,
        icon: AlertCircle,
        color: "red",
      },
    ].map((stat, index) => (
      <Card key={index}>
        <CardContent className="pt-4">
          <div className="flex items-center">
            <stat.icon className={`h-8 w-8 text-${stat.color}-500`} />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{stat.label}</p>
              <p className="text-2xl font-semibold text-gray-900">
                {stat.value}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);

const ProductForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    location: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Product</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              placeholder="Product Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div>
            <Input
              placeholder="Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>
          <div>
            <Input
              type="number"
              placeholder="Price (ETH)"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />
          </div>
          <div>
            <Input
              placeholder="Location"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
            />
          </div>
          <Button type="submit" className="w-full">
            Create Product
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

const QualityCheckForm = ({ productId, onSubmit }) => {
  const [notes, setNotes] = useState("");
  const [passed, setPassed] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ productId, passed, notes });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Perform Quality Check</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <select
              className="w-full p-2 border rounded"
              value={passed.toString()}
              onChange={(e) => setPassed(e.target.value === "true")}
            >
              <option value="true">Passed</option>
              <option value="false">Failed</option>
            </select>
          </div>
          <div>
            <Input
              placeholder="Notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full">
            Submit Check
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

const ProductsTable = ({ products, onAction }) => (
  <Card>
    <CardHeader>
      <CardTitle>Products</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b">
              <th className="pb-3 px-4">ID</th>
              <th className="pb-3 px-4">Name</th>
              <th className="pb-3 px-4">Status</th>
              <th className="pb-3 px-4">Owner</th>
              <th className="pb-3 px-4">Quality</th>
              <th className="pb-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b">
                <td className="py-3 px-4">#{product.id}</td>
                <td className="py-3 px-4">{product.name}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      product.status === ProductStatus.Created
                        ? "bg-gray-100"
                        : product.status === ProductStatus.ShippedByMfg
                        ? "bg-blue-100 text-blue-800"
                        : product.status === ProductStatus.ReceivedByDist
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {Object.keys(ProductStatus)[product.status]}
                  </span>
                </td>
                <td className="py-3 px-4">{product.currentOwner}</td>
                <td className="py-3 px-4">
                  {product.qualityPassed ? (
                    <span className="text-green-600">
                      <CheckCircle className="h-5 w-5 inline-block mr-1" />
                      Passed
                    </span>
                  ) : (
                    <span className="text-red-600">
                      <AlertCircle className="h-5 w-5 inline-block mr-1" />
                      Failed
                    </span>
                  )}
                </td>
                <td className="py-3 px-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onAction(product.id)}
                  >
                    <ArrowRightCircle className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CardContent>
  </Card>
);

const SupplyChainDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [account, setAccount] = useState("");
  const [stats, setStats] = useState({
    totalProducts: 0,
    inTransit: 0,
    qualityPassed: 0,
    qualityIssues: 0,
  });
  const [products, setProducts] = useState([]);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        setIsWalletConnected(true);
      } catch (error) {
        console.error("Failed to connect wallet:", error);
      }
    }
  };

  useEffect(() => {
    // Initialize stats and products
    setStats({
      totalProducts: 24,
      inTransit: 8,
      qualityPassed: 18,
      qualityIssues: 2,
    });

    setProducts([
      {
        id: 1,
        name: "Product A",
        status: ProductStatus.ShippedByMfg,
        currentOwner: "0x1234...5678",
        qualityPassed: true,
      },
      // Add more sample products...
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-gray-900">
                  Supply Chain Management
                </h1>
              </div>
            </div>
            <div className="flex items-center">
              {!isWalletConnected ? (
                <Button onClick={connectWallet}>Connect Wallet</Button>
              ) : (
                <span className="text-sm text-gray-600">
                  Connected: {account}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "dashboard" && (
          <>
            <Stats stats={stats} />
            <ProductsTable products={products} onAction={() => {}} />
          </>
        )}

        {activeTab === "products" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-2">
              <ProductsTable products={products} onAction={() => {}} />
            </div>
            <div>
              <ProductForm onSubmit={console.log} />
            </div>
          </div>
        )}

        {activeTab === "quality" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-2">
              <ProductsTable products={products} onAction={() => {}} />
            </div>
            <div>
              <QualityCheckForm productId={1} onSubmit={console.log} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default SupplyChainDashboard;
