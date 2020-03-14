import org.apache.hadoop.mapreduce.*;
import org.apache.hadoop.mapreduce.Reducer.Context;

import java.io.IOException;

import org.apache.hadoop.io.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;


public class AdsorptionDiffReducer extends Reducer<Text, Text, Text, Text> {

	double maxDiff = -99999999.0;
	
	@Override
	public void reduce(Text key, Iterable<Text> values, Context context) throws IOException, InterruptedException {
		
		HashMap<String, ArrayList<Double>> map = new HashMap<String, ArrayList<Double>>();

		for (Text value: values) {
			String user = value.toString().split(",")[0];
			double weight = Double.valueOf(value.toString().split(",")[1]);

			if (!map.containsKey(user)) {
				ArrayList<Double> weights = new ArrayList<Double>();
				weights.add(weight); 
				map.put(user, weights);
			} else {
				ArrayList<Double> weights = map.get(user);
				weights.add(weight);
				map.put(user, weights);
			}
		}

		for (Map.Entry<String, ArrayList<Double>> entry : map.entrySet()) {
			ArrayList<Double> weights = entry.getValue();
			if (weights.size() != 2) {
				double diff = weights.get(0);
				if (diff > maxDiff) {
					maxDiff = diff;
				}
			} else {
				double adsorpVal1 = weights.get(0);
				double adsorpVal2 = weights.get(1);

				double diff = Math.abs(adsorpVal2 - adsorpVal1);

				if (Double.compare(diff, maxDiff) > 0) {
					maxDiff = diff;
				}
			}
		}
	}

	@Override
	protected void cleanup(Context context) throws IOException, InterruptedException {
    	context.write(new Text(String.valueOf(maxDiff)), new Text(""));
  	}

}