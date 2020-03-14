import org.apache.hadoop.mapreduce.*;
import java.io.IOException;

import org.apache.hadoop.io.*;

public class AdsorptionDiffMapper extends Mapper<LongWritable, Text, Text, Text> {

	@Override
	public void map(LongWritable key, Text value, Context context) throws IOException, InterruptedException {

		String[] labelWeightsAndNeighbors = value.toString().split("\t");
		String originLabelWeights = labelWeightsAndNeighbors[0];

		if (originLabelWeights.contains("-")) {
			String[] labelWeights = originLabelWeights.split("-")[1].split(";");
			String origin = originLabelWeights.split("-")[0];
			for (int i = 0; i < labelWeights.length; i++) {
				System.out.println(origin);
				System.out.println(labelWeights[i]);
				context.write(new Text(origin), new Text(labelWeights[i]));
			}
		}

	}
}