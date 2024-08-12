import WidgetModel from '../model/widgetModel';
import { IWidget } from '../types/data';

class WidgetRepsitory {
    async update(projectId:string,newWidgetUpdate:Partial<IWidget>
    ) {
 

        return await WidgetModel.findOneAndUpdate({projectId},{$set:newWidgetUpdate},{new:true, upsert:true})

    }
}

const widgetRepository = new WidgetRepsitory();

export default widgetRepository;
