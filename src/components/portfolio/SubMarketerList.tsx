
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SubMarketer } from '@/types/database';
import { User, Mail, Phone } from 'lucide-react';

interface SubMarketerListProps {
  subMarketers: SubMarketer[];
  selectedSubMarketer: SubMarketer | null;
  onSubMarketerSelect: (subMarketer: SubMarketer) => void;
}

const SubMarketerList: React.FC<SubMarketerListProps> = ({
  subMarketers,
  selectedSubMarketer,
  onSubMarketerSelect,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sub-Marketers</CardTitle>
        <CardDescription>
          Select a sub-marketer to view their investors
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {subMarketers.map((subMarketer) => (
            <div
              key={subMarketer.sub_marketer_id}
              className={`p-4 border rounded-lg cursor-pointer transition-colors hover:bg-slate-50 ${
                selectedSubMarketer?.sub_marketer_id === subMarketer.sub_marketer_id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-slate-200'
              }`}
              onClick={() => onSubMarketerSelect(subMarketer)}
            >
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-slate-500" />
                  <h3 className="font-medium text-slate-900">{subMarketer.name}</h3>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-slate-600">
                  <Mail className="h-3 w-3" />
                  <span>{subMarketer.email}</span>
                </div>
                
                {subMarketer.phone && (
                  <div className="flex items-center space-x-2 text-sm text-slate-600">
                    <Phone className="h-3 w-3" />
                    <span>{subMarketer.phone}</span>
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    subMarketer.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {subMarketer.status}
                  </span>
                  
                  <span className="text-xs text-slate-500">
                    {new Date(subMarketer.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
          
          {subMarketers.length === 0 && (
            <div className="text-center py-8 text-slate-500">
              <User className="h-12 w-12 mx-auto mb-3 text-slate-300" />
              <p>No sub-marketers found</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SubMarketerList;
