// components/ui/CloudItemModal.tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const CloudItemModal = ({ open, onOpenChange, dimensionData, items }) => {
  if (!dimensionData) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[1200px] p-5 overflow-hidden">
        <DialogHeader>
          <DialogTitle>Drilldown for: {dimensionData.dimension}</DialogTitle>
        </DialogHeader>
        <div className="mt-2 text-sm">
          <p><strong>Timestamp:</strong> {dimensionData.timestamp}</p>
          <p><strong>Target:</strong> {dimensionData.target}</p>
          <p><strong>Expected:</strong> {dimensionData.normal_behavior}</p>
        </div>
        <table className="mt-4 w-full text-sm border border-gray-200">
          <thead>
            <tr>
              <th className="border p-2">Item</th>
              <th className="border p-2">Target</th>
              <th className="border p-2">Expected</th>
              <th className="border p-2">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={idx}>
                <td className="border p-2">{item.item}</td>
                <td className="border p-2">{item.target}</td>
                <td className="border p-2">{item.normal_behavior}</td>
                <td className="border p-2">{item.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </DialogContent>
    </Dialog>
  );
};

export default CloudItemModal;