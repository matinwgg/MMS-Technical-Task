import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export default function MerchantList({ merchants, onDelete, onUpdate }) {
  if (!merchants || merchants.length === 0) return <p className="text-center text-gray-500">No merchants found.</p>;

  return (
    <div className="grid gap-4">
      {merchants.map(m => (
        <Card key={m.id} className="flex justify-between items-center p-4">
          <div>
            <h3 className="font-semibold">{m.name}</h3>
            <p className="text-sm text-gray-500">{m.business_registration_number} • {m.email} • {m.phone}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant={m.status === "ACTIVE" ? "default" : m.status === "PENDING" ? "secondary" : "destructive"}>{m.status}</Badge>
            <Button size="sm" onClick={() => onUpdate(m.id, { status: m.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE" })}>Toggle Status</Button>
            <Button size="sm" variant="destructive" onClick={() => onDelete(m.id)}>Delete</Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
