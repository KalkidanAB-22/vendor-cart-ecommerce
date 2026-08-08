import { useParams } from "react-router-dom";

export default function Invoice() {
  const { id } = useParams();

  return (
    <div
      className="
max-w-3xl
mx-auto
px-4
py-10
"
    >
      <div
        className="
glass
rounded-3xl
p-8
"
      >
        <h1
          className="
text-3xl
font-bold
"
        >
          Invoice
        </h1>

        <div
          className="
mt-6
space-y-3
text-gray-200
"
        >
          <p>
            Order ID:
            <span
              className="
text-green-400
ml-2
font-bold
"
            >
              {id}
            </span>
          </p>

          <p>
            Payment Status:
            <span
              className="
text-green-400
ml-2
"
            >
              Paid ✅
            </span>
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="
mt-8
bg-green-600
hover:bg-green-500
px-5
py-3
rounded-xl
transition
"
        >
          Print Invoice
        </button>
      </div>
    </div>
  );
}
