import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URI;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FSDataInputStream;
import org.apache.hadoop.fs.FileStatus;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.DoubleWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;

// need to keep track of edges, weight of edge, curr weight of the label, 

// if user had no interets, make an interest called "nothing"

// input data format:
// name:interest,interest/friend/affiliation,interest/friend/affiliatio,...

// interemediate data format:
// _key_: label-label,weight;label,weight \t name,weight;name,weight ...
// label (for name), curr weight of label \t interest,weight;interest,weight ...

// init mapper: get label : label, 

public class AdsorptionDriver {

	public static void init(String inputDir, String outputDir) throws Exception {
		Job job = Job.getInstance();
		job.setJarByClass(AdsorptionDriver.class);
		FileInputFormat.addInputPath(job, new Path(inputDir));
		FileOutputFormat.setOutputPath(job, new Path(outputDir));

		// Set Mapper and Reducer classes
		job.setMapperClass(AdsorptionInitMapper.class);
		job.setReducerClass(AdsorptionInitReducer.class);

		// Set output types of the Mapper class
		job.setMapOutputKeyClass(Text.class);
		job.setMapOutputValueClass(Text.class);

		// Set output types of Reducer class
		job.setOutputKeyClass(Text.class);
		job.setOutputValueClass(Text.class);

		System.out.print(job.waitForCompletion(true) ? "Init Job Completed"
				: "Init Job Error");
		  
	}

	public static void iter(String inputDir, String outputDir) throws Exception {
		deleteDirectory(outputDir);
		Job job = Job.getInstance();
		job.setJarByClass(AdsorptionDriver.class);
		FileInputFormat.addInputPath(job, new Path(inputDir));
		FileOutputFormat.setOutputPath(job, new Path(outputDir));

		// Set Mapper and Reducer classes
		job.setMapperClass(AdsorptionIterMapper.class);
		job.setReducerClass(AdsorptionIterReducer.class);

		// Set output types of the Mapper class
		job.setMapOutputKeyClass(Text.class);
		job.setMapOutputValueClass(Text.class);

		// Set output types of Reducer class
		job.setOutputKeyClass(Text.class);
		job.setOutputValueClass(Text.class);

		System.out.print(job.waitForCompletion(true) ? "Iter Job Completed"
				: "Iter Job Error");
		  
	}

	public static void diff(String inputDir1, String inputDir2, String outputDir, int reducers) throws ClassNotFoundException, 
	IllegalStateException, InterruptedException, Exception {
		deleteDirectory(outputDir);
		Job job = Job.getInstance();
		job.setJarByClass(AdsorptionDriver.class);
		FileInputFormat.addInputPath(job, new Path(inputDir1));
		FileInputFormat.addInputPath(job, new Path(inputDir2));
		FileOutputFormat.setOutputPath(job, new Path(outputDir));
		job.setNumReduceTasks(reducers);

		// Set Mapper and Reducer classes
		job.setMapperClass(AdsorptionDiffMapper.class);
		job.setReducerClass(AdsorptionDiffReducer.class);

		// Set output types of the Mapper class
		job.setMapOutputKeyClass(Text.class);
		job.setMapOutputValueClass(Text.class);

		// Set output types of Reducer class
		job.setOutputKeyClass(Text.class);
		job.setOutputValueClass(Text.class);

		System.out.print(job.waitForCompletion(true) ? "Diff Job Completed"
				: "Diff Job Error");
		  
	}

	public static void finish(String inputDir, String outputDir) throws IllegalArgumentException, IOException, 
	ClassNotFoundException, InterruptedException, IllegalStateException, Exception {
		Job job = Job.getInstance();
		job.setJarByClass(AdsorptionDriver.class);
		FileInputFormat.addInputPath(job, new Path(inputDir));
		FileOutputFormat.setOutputPath(job, new Path(outputDir));

		// Set Mapper and Reducer classes
		job.setMapperClass(AdsorptionFinishMapper.class);
		job.setReducerClass(AdsorptionFinishReducer.class);

		// Set output types of the Mapper class
		job.setMapOutputKeyClass(Text.class);
		job.setMapOutputValueClass(Text.class);

		// Set output types of Reducer class
		job.setOutputKeyClass(Text.class);
		job.setOutputValueClass(Text.class);

		System.out.print(job.waitForCompletion(true) ? "Diff Job Completed"
				: "Diff Job Error");
		  
	}

	public static void composite(String inputDir, String outputDir, String interDir1, 
			String interDir2, String interDir3, String diffDir) throws IllegalStateException, Exception {
		
		deleteDirectory(interDir1);
		deleteDirectory(interDir2);
		deleteDirectory(interDir3);
		deleteDirectory(diffDir);
		deleteDirectory(outputDir);

		double maxDifference = 99999999999.0;

		// put data into intermediate format
		init(inputDir, interDir1);

		int counter = 0;
		while (Double.compare(maxDifference, 0.5) > 0 ) {
			if (counter % 3 == 0) {
				iter(interDir1, interDir2);
			} else if (counter % 3 == 1) {
				iter(interDir2, interDir3);
			} else {
				iter(interDir3, interDir1);
			}

			if (counter % 6 == 1) {
				diff(interDir1, interDir3, diffDir, 10);
				maxDifference = readDiffResult(diffDir);
			}

			// if counter is even, delete intermediate directory 1
			// if (counter % 3 == 0) {
			// 	deleteDirectory(interDir1);
			// } else if (counter % 3 == 1) {
			// 	deleteDirectory(interDir2);
			// } else {
			// 	deleteDirectory(interDir3);
			// }
			
			counter++;
		}

		finish(interDir3, outputDir);

		
	}


	public static void main(String[] args) throws Exception {

		System.out.println("Name: Matthew Kim; SEAS Login: mattmkim");

		if (args[0].equals("init")) {
			if (args.length != 3) {
				System.err.println("Usage: AdsorptionDriver init <inputDir> <outputDir>");
		      	System.exit(-1);
			}

			init(args[1], args[2]);

		} else if (args[0].equals("iter")) {
			if (args.length != 3) {
				System.err.println("Usage: AdsorptionDriver iter <inputDir> <outputDir>");
		      	System.exit(-1);
			}

			iter(args[1], args[2]);
		} else if (args[0].equals("diff")) {
			if (args.length != 5) {
				System.err.println("Usage: AdsorptionDriver diff <inputDir1> <inputDir2> <outputDir> <#reducers>");
		      	System.exit(-1);
			}

			diff(args[1], args[2], args[3], Integer.parseInt(args[4]));
		} else if (args[0].equals("finish")) {
			if (args.length != 3) {
				System.err.println("Usage: AdsorptionDriver finish <inputDir> <outputDir>");
		      	System.exit(-1);
			}

			finish(args[1], args[2]);
		} else {
			if (args.length != 7) {
				System.err.println("Usage: AdsorptionDriver composite <inputDir> <outputDir> <interDir1> <interDir2> <interDir3> <diffDir>");
			    System.exit(-1);
			}

			composite(args[1], args[2], args[3], args[4], args[5], args[6]);
		}
	}


	// Given an output folder, returns the first double from the first part-r-00000 file
    static double readDiffResult(String path) throws Exception {
	    double diffnum = 0.0;
	    Path diffpath = new Path(path);
	    Configuration conf = new Configuration();
	    FileSystem fs = FileSystem.get(URI.create(path),conf);
    
	    if (fs.exists(diffpath)) {
	    	FileStatus[] ls = fs.listStatus(diffpath);
	    	for (FileStatus file : ls) {
				if (file.getPath().getName().startsWith("part-r-") && !file.getPath().getName().contains(".crc")) {
					FSDataInputStream diffin = fs.open(file.getPath());
					BufferedReader d = new BufferedReader(new InputStreamReader(diffin));
					String diffcontent = d.readLine();
					double currDiff = Double.parseDouble(diffcontent);
					if (Double.compare(currDiff, diffnum) > 0) {
						diffnum = currDiff;
					}
					d.close();
				}
	     	}
	    }
	    
	    fs.close();
	    return diffnum;
    }


	static void deleteDirectory(String path) throws Exception {
    	
    	Path todelete = new Path(path);
    	Configuration conf = new Configuration();
    	FileSystem fs = FileSystem.get(URI.create(path), conf);
    
    	if (fs.exists(todelete)) {
   	 		fs.delete(todelete, true);
    	}
      
    	fs.close();
  }
}
